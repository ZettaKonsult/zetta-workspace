/* @flow */

/**
 * @date 2018-01-04
 */

import AWS from 'aws-sdk'
AWS.config.update({ region: 'eu-central-1' })
const dynamoDB = new AWS.DynamoDB.DocumentClient()

const getOrganisationId = async (name: string) => {
  const result = await dynamoDB
    .query({
      TableName: 'MembrumOrganisations',
      IndexName: 'organisationName',
      KeyConditionExpression: 'organisationName = :orgName',
      ExpressionAttributeValues: {
        ':orgName': name
      }
    })
    .promise()
  return result.Items.find(org => org.organisationName === name).organisationId
}

export const getOrganisationIds = async (organisationNames: {
  [string]: [string]
}): { [string]: [string] } => {
  const ids = {}
  for (let [key, names] of Object.entries(organisationNames)) {
    let arr = []
    for (let name of names) {
      arr.push(await getOrganisationId(name))
    }
    ids[key] = arr
  }
  return ids
}
