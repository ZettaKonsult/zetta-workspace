/**
 * Convenience functions for working with AWS Dynamo DB.
 *
 * @date 2017-11-22
 */

import AWS from "aws-sdk"

AWS.config.update({ region: "us-east-1" })

export function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient()

  return dynamoDb[action](params).promise()
}
