/* @flow */

/**
 * @date 2018-01-04'
 *
 * This file mostly exists mainly since some features (e.g. spread operator)
 * don't work with serverless.
 */

import AWS from 'aws-sdk'
import { config } from '../'
AWS.config.update({ region: 'eu-central-1' })
const dynamoDB = new AWS.DynamoDB.DocumentClient()

const getOrganisationId = async (name: string) => {
  const indexKey = config.Database.Organisations.IndexKey
  const result = await dynamoDB
    .query({
      TableName: config.Database.Organisations.Name,
      IndexName: indexKey,
      KeyConditionExpression: `${indexKey} = :orgName`,
      ExpressionAttributeValues: {
        ':orgName': name
      }
    })
    .promise()
  return result.Items.find(org => org.organisationName === name).organisationId
}

export const getObjects = (params: {
  source: [{ [string]: any }],
  key: any,
  value: any
}): Array<{ [string]: any }> => {
  const { source, key, value } = params
  return source.filter(object => key in object && source[key] === value)
}
export const newObject = (source: { [string]: any }, keys: [string]) =>
  keys.reduce(
    (object, key) => ({
      ...object,
      [key]: source[key]
    }),
    {}
  )

export const getOrganisationIds = async (organisationNames: {
  [string]: Array<string>
}): Promise<{ [string]: [string] }> => {
  const ids = {}
  for (let [key, orgNames] of Object.entries(organisationNames)) {
    // Recast required due to flow bug with Object.entries and Object.values.
    const names: Array<string> = (orgNames: any)

    let arr = []
    for (let name of names) {
      arr.push(await getOrganisationId(name))
    }
    ids[key] = arr
  }
  return ids
}
