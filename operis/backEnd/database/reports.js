/**
 * Lambda function handlers for the Reports table.
 *
 * @date  2017-11-23
 */

import AWS from 'aws-sdk';
import uuid from 'uuid';
import * as dynamoDbLib from './dynamoDBLib';
import { success, failure } from './response';

AWS.config.update({ region: 'eu-central-1' });

const TABLE = 'OperisReports';

export async function createReport(event, context, callback) {
  const data = JSON.parse(data.body);

  const params = {
    TableName: TABLE,

    Item: {
      reportId: uuid.v1(),
      workerId: data.workerId,
      date: data.date,
      hours: data.hours,
      projectId: data.projectId,
      driving: data.driving,
      extraWork: data.extraWork,
      extraHours: data.extraHours,
      submittedBy: data.submittedBy,
    },
  };

  try {
    await dynamoDbLib.call('put', params);
    callback(null, success(params.Item));
  } catch (e) {
    callback(null, failure({ status: [e.message] }));
  }
}

export async function deleteReport(event, context, callback) {
  const params = {
    TableName: TABLE,

    Key: {
      reportId: event.pathParameters.id,
    },
  };

  try {
    await dynamoDbLib.call('delete', params);
    callback(null, success({ status: true }));
  } catch (e) {
    callback(null, failure({ status: [e] }));
  }
}

export async function getReport(event, context, callback) {
  const params = {
    TableName: TABLE,

    Key: {
      reportId: event.pathParameters.id,
    },
  };

  try {
    const result = await dynamoDbLib.call('get', params);
    if (result.Item) {
      callback(null, success(result.Item));
    } else {
      callback(null, failure({ status: false, error: 'Item not found.' }));
    }
  } catch (e) {
    callback(null, failure({ status: [e] }));
  }
}

export async function updateReport(event, context, callback) {
  const data = JSON.parse(data.body);

  const params = {
    TableName: TABLE,

    Key: {
      reportId: event.pathParameters.id,
    },

    UpdateExpression:
      'SET workerId = :workerId, date = :date, ' +
      'hours = :hours, projectId = :projectId, driving = :driving ' +
      'extraWork = :extraWork, extraHours = :extraHours, ' +
      'submittedBy = :submittedBy',
    ExpressionAttributeValues: {
      ':workerId': data.workerId ? data.workerId : null,
      ':date': data.date ? data.date : null,
      ':hours': data.hours ? data.hours : null,
      ':projectId': data.projectId ? data.projectId : null,
      ':driving': data.driving ? data.driving : null,
      ':extraWork': data.extraWork ? data.extraWork : null,
      ':extraHours': data.extraHours ? data.extraHours : null,
      ':submittedBy': data.submittedBy ? data.submittedBy : null,
    },
    ReturnValues: 'ALL_NEW',
  };

  try {
    await dynamoDbLib.call('update', params);
    callback(null, success({ status: true }));
  } catch (e) {
    callback(null, failure({ status: [e] }));
  }
}
