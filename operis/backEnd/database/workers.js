/**
 * Lambda function handlers for the Workers table.
 *
 * @date  2017-11-23
 */

import AWS from "aws-sdk"
import * as dynamoDbLib from "./dynamoDBLib"
import { success, failure } from "./response"

AWS.config.update({ region: "eu-central-1" })

const TABLE = "OperisWorkers"

export async function createWorker(event, context, callback) {
  const data = JSON.parse(event.body)

  const params = {
    TableName: TABLE,

    Item: {
      ssn: data.ssn,
      name: data.workerName,
      phone: data.phone,
      show: data.show
    }
  }

  try {
    await dynamoDbLib.call("put", params)
    callback(null, success(params.Item))
  } catch (e) {
    callback(null, failure({ status: [e.message] }))
  }
}

export async function deleteWorker(event, context, callback) {
  const params = {
    TableName: TABLE,

    Key: {
      ssn: event.pathParameters.ssn
    }
  }

  try {
    await dynamoDbLib.call("delete", params)
    callback(null, success({ status: true }))
  } catch (e) {
    callback(null, failure({ status: [e] }))
  }
}

export async function getWorker(event, context, callback) {
  const params = {
    TableName: TABLE,

    Key: {
      ssn: event.pathParameters.ssn
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

export async function updateWorker(event, context, callback) {
  const data = JSON.parse(event.body)

  const params = {
    TableName: TABLE,

    Key: {
      ssn: event.pathParameters.ssn
    },

    UpdateExpression:
      "SET workerId = :workerId, date = :date, " +
      "hours = :hours, projectId = :projectId, driving = :driving " +
      "extraWork = :extraWork, extraHours = :extraHours, " +
      "submittedBy = :submittedBy",
    ExpressionAttributeValues: {
      ":workerId": data.workerId ? data.workerId : null,
      ":date": data.date ? data.date : null,
      ":hours": data.hours ? data.hours : null,
      ":projectId": data.projectId ? data.projectId : null,
      ":driving": data.driving ? data.driving : null,
      ":extraWork": data.extraWork ? data.extraWork : null,
      ":extraHours": data.extraHours ? data.extraHours : null,
      ":submittedBy": data.submittedBy ? data.submittedBy : null
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
