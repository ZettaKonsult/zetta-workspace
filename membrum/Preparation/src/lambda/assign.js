/* @flow */

/**
 * @date  2017-11-07
 */

import type { AWSCallback } from './types'
import { getOrganisationIds } from './util'
import * as unionAssigner from '../unionAssigner'
import AWS from 'aws-sdk'
import { config } from '../config'

AWS.config.update({ region: 'eu-central-1' })
const dynamoDB = new AWS.DynamoDB.DocumentClient()

export const getAssignments = async (callback: AWSCallback) => {
  console.log(`Parsing LADOK results.`)

  let parseResult = {}
  try {
    parseResult = await dynamoDB
      .scan({
        TableName: 'LadokParseResult'
      })
      .promise()
    parseResult = unionAssigner.aggregateResults(parseResult.Items)
  } catch (error) {
    callback(error)
  }
  console.log(`Fetched LADOK parse results from database.`)

  const faculties = unionAssigner.getFaculties(parseResult)
  let trfMap = {}

  try {
    trfMap = await getOrganisationIds(config.TRF.UnionMapping)
  } catch (error) {
    callback(error)
  }
  console.log(`Fetched organisation IDs.`)

  const newAssignments = unionAssigner.getUnions(trfMap, faculties)

  let users = {}
  try {
    users = await dynamoDB
      .scan({
        TableName: 'MembrumUsers'
      })
      .promise()
    users = users.Items.reduce((object, user) => {
      object[user.ssn] = {
        ...user,
        attributes: {
          family_name: user.family_name,
          given_name: user.given_name,
          birthdate: user.ssn,
          email: user.email
        }
      }
      return object
    }, {})
  } catch (error) {
    callback(error)
  }
  console.log(`Fetched user data from database.`)

  for (const ssn of Object.keys(parseResult)) {
    if (!(ssn in users)) {
      users[ssn] = parseResult[ssn]
    }
  }

  return unionAssigner.getUpdatedUnions({
    NewAssignments: newAssignments,
    Users: users
  })
}
