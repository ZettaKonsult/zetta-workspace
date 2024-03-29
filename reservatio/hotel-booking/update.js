import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'rooms',
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'userId': User Pool sub of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      roomId: event.pathParameters.id,
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression:
      'SET beds = :beds, maxOccupancy = :maxOccupancy, costPerNight = :costPerNight, reserved = :reserved',
    ExpressionAttributeValues: {
      ':beds': data.beds ? data.beds : null,
      ':maxOccupancy': data.maxOccupancy ? data.maxOccupancy : null,
      ':reserved': data.reserved ? data.reserved : null,
      ':costPerNight': data.costPerNight ? data.costPerNight : null,
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    const result = await dynamoDbLib.call('update', params);
    callback(null, success({ status: true }));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}
