import parser from './parser';
import { addInvoiceRow, allInvoiceRows } from './invoiceRows';
import { createInvoice } from './invoice';
import { success, failure } from './response';
import db from './database';

export const writeInvoice = async (event, context, callback) => {
  const { data } = parser(event);

  try {
    const result = await createInvoice(db, data);
    callback(null, success(result));
  } catch (err) {
    console.error(err);
    callback(null, failure(err.message));
  }
};

export const writeBillableRow = async (event, context, callback) => {
  const { data } = parser(event);
  try {
    const result = await addInvoiceRow(db, data);
    callback(null, success(result));
  } catch (err) {
    console.error(err);
    callback(null, failure(err.message));
  }
};

export const getBillableRows = async (event, context, callback) => {
  const { params } = parser(event);

  try {
    const result = await allInvoiceRows(db, params.companyCustomerId);
    callback(null, success(result));
  } catch (err) {
    console.error(err);
    callback(null, failure(err.message));
  }
};
