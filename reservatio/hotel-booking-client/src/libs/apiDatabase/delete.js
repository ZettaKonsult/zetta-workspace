import * as dynamoDbLib from './libs/dynamodb-lib'
import { success, failure } from './libs/response-lib'

export async function main(event, context, callback) {
  const params = {
    TableName: 'rooms',
    // 'Key' defines the partition key and sort key of the item to be removed
    // - 'userId': User Pool sub of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      roomId: event.pathParameters.id
    }
  }

  try {
    const result = await dynamoDbLib.call('delete', params)
    return true
  } catch (e) {
    throw new Error(e)
  }
}
