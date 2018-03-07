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

export default async (method, params) => {
  return await client[method](params).promise();
};
