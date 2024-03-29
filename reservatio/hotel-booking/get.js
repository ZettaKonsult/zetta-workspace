import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const roomId = decodeURIComponent(event.pathParameters.id);
  const params = {
    TableName: 'rooms',
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': federated identity ID of the authenticated user
    // - 'noteId': path parameter
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      roomId,
    },
  };

  try {
    const result = await dynamoDbLib.call('get', params);
    if (result.Item) {
      // Return the retrieved item
      callback(null, success(result.Item));
    } else {
      callback(null, failure({ status: false, error: 'Item not found.' }));
    }
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}
