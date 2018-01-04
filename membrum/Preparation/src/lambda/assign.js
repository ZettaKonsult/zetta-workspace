/* @flow */

/**
 * @date  2017-11-07
 */

import type { AWSCallback, AWSContext, AWSEvent } from './types'
import { getOrganisationIds } from './util'
import * as unionAssigner from '../unionAssigner'
import AWS from 'aws-sdk'
import { config } from '../config'

import util from 'util'

AWS.config.update({ region: 'eu-central-1' })
const dynamoDB = new AWS.DynamoDB.DocumentClient()

export const getParseResults = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  let parseResult = {}
  try {
    parseResult = await dynamoDB
      .scan({
        TableName: 'LadokParseResult'
      })
      .promise()
    parseResult = parseResult.Items
  } catch (error) {
    callback(error)
  }

  const faculties = unionAssigner.getFaculties(parseResult)
  const trfMap = await getOrganisationIds(config.TRF.UnionMapping)
  const newAssignments = unionAssigner.getUnions(trfMap, faculties)

  let userResult = {}
  try {
    userResult = await dynamoDB
      .scan({
        TableName: 'MembrumUsers'
      })
      .promise()
    userResult = userResult.Items
  } catch (error) {
    callback(error)
  }

  callback(
    null,
    unionAssigner.getUpdatedUnions({
      NewAssignments: newAssignments,
      Users: userResult
    })
  )
}
