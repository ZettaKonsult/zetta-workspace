/**
 * Lambda function handlers for the Projects table.
 *
 * @date  2017-11-22
 */

import AWS from "aws-sdk"
import uuid from "uuid"
import * as dynamoDbLib from "./dynamoDBLib"
import { success, failure } from "./response"

AWS.config.update({ region: "eu-central-1" })

const TABLE = "OperisProjects"

export async function createProject(event, context, callback) {
  const data = JSON.parse(event.body)

  const params = {
    TableName: TABLE,

    Item: {
      projectId: uuid.v1(),
      title: data.title,
      city: data.city
    }
  }

  try {
    await dynamoDbLib.call("put", params)
    callback(null, success(params.Item))
  } catch (e) {
    callback(null, failure({ status: [e.message] }))
  }
}

export async function deleteProject(event, context, callback) {
  const params = {
    TableName: TABLE,

    Key: {
      projectId: event.pathParameters.id
    }
  }

  try {
    await dynamoDbLib.call("delete", params)
    callback(null, success({ status: true }))
  } catch (e) {
    callback(null, failure({ status: [e] }))
  }
}

export async function getProject(event, context, callback) {
  const params = {
    TableName: TABLE,

    Key: {
      projectId: event.pathParameters.id
    }
  }

  try {
    const result = await dynamoDbLib.call("get", params)
    if (result.Item) {
      callback(null, success(result.Item))
    } else {
      callback(null, failure({ status: false, error: "Item not found." }))
    }
  } catch (e) {
    callback(null, failure({ status: [e] }))
  }
}

export async function updateProject(event, context, callback) {
  const data = JSON.parse(event.body)

  const params = {
    TableName: TABLE,

    Key: {
      projectId: event.pathParameters.id
    },

    UpdateExpression: "SET title = :title, city = :city",
    ExpressionAttributeValues: {
      ":title": data.title ? data.title : null,
      ":city": data.city ? data.city : null
    },
    ReturnValues: "ALL_NEW"
  }

  try {
    await dynamoDbLib.call("update", params)
    callback(null, success({ status: true }))
  } catch (e) {
    callback(null, failure({ status: [e] }))
  }
}
