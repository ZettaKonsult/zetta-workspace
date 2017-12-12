import AWS from 'aws-sdk'
import { getAwsCredentials } from '../awslib'

import { buildUpdateExpression, buildAttributeValues } from './queryBuilder'

AWS.config.update({ region: 'eu-central-1' })

export async function update(TableName = 'rooms', roomId, values, userToken) {
  console.log(values)
  await getAwsCredentials(userToken)
  const params = {
    TableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': User Pool sub of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: AWS.config.credentials.identityId,
      roomId
    },
    UpdateExpression: buildUpdateExpression(values),
    ExpressionAttributeValues: buildAttributeValues(values),
    ReturnValues: 'ALL_NEW'
  }
  try {
    return await call('update', params)
  } catch (e) {
    console.error(e)
  }
}

export function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient()

  return dynamoDb[action](params).promise()
}
