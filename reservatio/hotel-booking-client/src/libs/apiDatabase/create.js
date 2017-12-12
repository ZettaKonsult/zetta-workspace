import * as dynamoDbLib from './libs/dynamodb-lib'
import { success, failure } from './libs/response-lib'

export async function main(event, context, callback) {
  const data = JSON.parse(event.body)
  const params = {
    TableName: 'rooms',
    // 'Item' contains the attributes of the item to be created
    // - 'userId': because users are authenticated via Cognito User Pool, we
    //             will use the User Pool sub (a UUID) of the authenticated user
    // - 'roomId': a unique room number
    // - 'createdAt': current Unix timestamp
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      roomId: data.roomId,
      beds: data.beds,
      maxOccupancy: data.maxOccupancy,
      costPerNight: data.costPerNight,
      reserved: data.reserved,
      createdAt: new Date().getTime()
    }
  }

  try {
    const result = await dynamoDbLib.call('put', params)
    return params.Item
  } catch (e) {
    throw new Error(e)
  }
}
