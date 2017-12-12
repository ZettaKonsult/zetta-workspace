import AWS from 'aws-sdk'
import { getAwsCredentials } from '../awslib'
AWS.config.update({ region: 'eu-central-1' })

export function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient()

  return dynamoDb[action](params).promise()
}

export const getAll = async userToken => {
  await getAwsCredentials(userToken)

  const params = {
    TableName: 'rooms',
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId' partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be User Pool sub of the authenticated user
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': AWS.config.credentials.identityId
    }
  }

  try {
    const result = await call('query', params)
    if (result.Items) {
      return result.Items
    } else {
      return 'No Items Found'
    }
  } catch (e) {
    console.error(e)
  }
}
