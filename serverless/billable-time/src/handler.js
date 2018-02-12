import cuid from 'cuid';

import response from './response';
import db from './database';

const Invoice = process.env.Invoice;
const BillableRow = process.env.BillableRow;

export const createInvoice = async (event, context, callback) => {
  let result;
  let statusCode = 200;
  const data = JSON.parse(event.body);

  try {
    const rows = data.billableTimeId;
    for (let i = 0; i < rows.length; i++) {
      const result = await db('update', {
        TableName: Invoice,
        Key: { customerId: data.customerId, id: rows[i] },
        Values: { stage: 'billed' },
      });
      console.log(result);
    }
  } catch (err) {
    console.error(err);
    statusCode = 500;
    result = err;
  }

  callback(null, response(statusCode, result));
};

export const addBillableRow = async (event, context, callback) => {
  let result;
  let statusCode = 200;
  const { customerId, workplaceId, unit, price, description } = JSON.parse(
    event.body
  );
  const params = {
    TableName: BillableRow,
    Item: {
      id: cuid(),
      customerId,
      workplaceId,
      unit,
      price,
      description,
      stage: 'pending',
    },
  };
  result = await db('put', params);

  callback(null, response(statusCode, result.Item));
};

export const allBillableRows = async (event, context, callback) => {
  let result;
  let statusCode = 200;

  const { customerId } = event.pathParameters;

  try {
    result = await db('query', {
      TableName: BillableRow,
      KeyConditionExpression: 'customerId = :customerId',
      ExpressionAttributeValues: {
        ':customerId': customerId,
      },
    });
  } catch (err) {
    statusCode = 500;
    result = err;
  }

  callback(null, response(statusCode, result));
};
