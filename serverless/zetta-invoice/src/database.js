/* @flow */

import AWS from 'aws-sdk';

const isOffline = process.env.IS_OFFLINE;
console.log(isOffline);

const dynamodbOfflineOptions = {
  region: 'localhost',
  endpoint: 'http://localhost:8000',
};

const client = isOffline
  ? new AWS.DynamoDB.DocumentClient(dynamodbOfflineOptions)
  : new AWS.DynamoDB.DocumentClient();

export const getDbTable = (params: { name: string }): string => {
  return params.name;
};

export default async (method: string, params: { [string]: any }) => {
  return await client[method](params).promise();
};
