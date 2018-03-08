/* @flow */

import AWS from 'aws-sdk';

const isOffline = process.env.IS_OFFLINE;
const dynamodbOfflineOptions = {
  region: 'localhost',
  endpoint: 'http://localhost:8000',
};

const client = isOffline
  ? new AWS.DynamoDB.DocumentClient(dynamodbOfflineOptions)
  : new AWS.DynamoDB.DocumentClient();

export default (method, params): any => {
  return client[method](params).promise();
};
