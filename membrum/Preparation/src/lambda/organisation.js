/* @flow */

/**
 * @date  2018-01-04
 */

import type { AWSCallback, AWSContext, AWSEvent } from './types'

import AWS from 'aws-sdk'
import uuid from 'uuid'

AWS.config.update({ region: 'eu-central-1' })
const dynamoDB = new AWS.DynamoDB.DocumentClient()
const TABLE = 'MembrumOrganisations'

class OrganisationExists extends Error {}

export const registerOrganisations = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => event.names.forEach(async name => await register(name, context, callback))

const register = async (
  name: string,
  context: AWSContext,
  callback: AWSCallback
) => {
  try {
    const result = await dynamoDB
      .query({
        TableName: TABLE,
        IndexName: 'organisationName',
        KeyConditionExpression: 'organisationName = :orgName',
        ExpressionAttributeValues: {
          ':orgName': name
        }
      })
      .promise()

    if (result.Items && result.Items.length > 0) {
      throw new OrganisationExists(`Organisation ${name} already exists!`)
    }

    await dynamoDB
      .put({
        TableName: TABLE,
        Item: {
          organisationId: uuid.v1(),
          organisationName: name,
          createdAt: new Date().getTime()
        }
      })
      .promise()
    console.log(`Successfully created organisation ${name}.`)
  } catch (error) {
    callback(error)
  }
}
