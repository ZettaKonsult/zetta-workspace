import parser from './parser';
import { addBillableRow, allBillableRows } from './billableRow';
import { createInvoice } from './invoice';
import response from './response';
import db from './database';

export const writeInvoice = async (event, context, callback) => {
  let statusCode = 200;
  const { data } = parser(event);

  const result = await createInvoice(db, data);

  callback(null, response(statusCode, result));
};

export const writeBillableRow = async (event, context, callback) => {
  let statusCode = 200;
  const { data } = parser(event);

  const result = await addBillableRow(db, data);

  callback(null, response(statusCode, result));
};

export const getBillableRows = async (event, context, callback) => {
  let statusCode = 200;
  const { params } = parser(event);

  const result = await allBillableRows(db, params.companyCustomerId);

  callback(null, response(statusCode, result));
};
