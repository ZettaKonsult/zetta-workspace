import * as Invoice from '../invoice';
import db from '../database';
import { getTable } from '../config';
import parser from 'serverless-event-parser';

const INVOICE_TABLE = 'Invoices';
const INVOICE_ROW_TABLE = 'InvoiceRow';

export const create = async (event, context, callback) => {
  const { data } = parser(event);
  const { customerId, rowIds } = data;

  try {
    rowIds.forEach(async rowId => {
      const invoice = await Invoice.create({ customerId, rowId });
      await db('create', {
        TableName: getTable({ name: INVOICE_TABLE }),
        Item: invoice,
      });
    });
  } catch (error) {
    console.error(error);
    callback(error);
  }
};

export const createRow = async (event, context, callback) => {
  const { data } = parser(event);

  try {
    const invoice = await Invoice.createRow({ ...data });
    await db('create', {
      TableName: getTable({ name: INVOICE_ROW_TABLE }),
      Item: invoice,
    });
  } catch (error) {
    console.error(error);
    callback(error);
  }
};

export const setStatus = async (event, context, callback) => {
  const { data } = parser(event);
  const { invoiceId, status } = data;
  const tableName = getTable({ name: INVOICE_TABLE });

  try {
    const invoice = await db('get', {
      TableName: tableName,
      Item: { id: invoiceId },
    });
    await db('update', {
      TableName: getTable({ name: INVOICE_TABLE }),
      Item: { ...invoice, status },
    });
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
