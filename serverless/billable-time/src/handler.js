import parser from './parser';
import billableRow from './billableRow';
import response from './response';
import db from './database';

const InvoiceTable = process.env.InvoiceTable;
const BillableRowTable = process.env.BillableRowTable;

export const createInvoice = async (event, context, callback) => {
  let result;
  let statusCode = 200;
  const { data } = parser(event);

  try {
    const rows = data.billableTimeId;
    for (let i = 0; i < rows.length; i++) {
      const result = await db('update', {
        TableName: InvoiceTable,
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
  let statusCode = 200;

  const { data } = parser(event);
  let result = billableRow(data);
  const params = {
    TableName: BillableRowTable,
    Item: result,
  };
  try {
    await db('put', params);
  } catch (err) {
    statusCode = 500;
    result = err;
  }

  callback(null, response(statusCode, result));
};

export const allBillableRows = async (event, context, callback) => {
  let result;
  let statusCode = 200;

  const { params } = parser(event);

  try {
    result = await db('query', {
      TableName: BillableRowTable,
      KeyConditionExpression: 'customerId = :customerId',
      ExpressionAttributeValues: {
        ':customerId': params.customerId,
      },
    });
  } catch (err) {
    statusCode = 500;
    result = err;
  }

  callback(null, response(statusCode, result));
};
