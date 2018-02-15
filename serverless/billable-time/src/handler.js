import parser from './parser';
import { addInvoiceRow, allInvoiceRows } from './invoiceRows';
import { createInvoice } from './invoice';
import response from './response';
import db from './database';

export const writeInvoice = async (event, context, callback) => {
  let statusCode = 200;
  const { data } = parser(event);

  try {
    const result = await createInvoice(db, data);
    callback(null, response(statusCode, result));
  } catch (err) {
    callback(null, response(502, err.message));
  }
};

export const writeBillableRow = async (event, context, callback) => {
  let statusCode = 200;
  const { data } = parser(event);

  const result = await addInvoiceRow(db, data);

  callback(null, response(statusCode, result));
};

export const getBillableRows = async (event, context, callback) => {
  let statusCode = 200;
  const { params } = parser(event);

  const result = await allInvoiceRows(db, params.companyCustomerId);

  callback(null, response(statusCode, result));
};
