import parser from './parser';
import invoice, { addInvoiceRow, allInvoiceRows } from './invoiceRows';
import { createInvoice } from './invoice';
import { success, failure } from './response';
import recipient from './recipient';
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

export const getInvoices = async (event, context, callback) => {
  const { params } = parser(event);
  try {
    const result = await invoice.list(db, params.id);
    callback(null, success(result));
  } catch (error) {
    console.error(error);
    callback(null, failure(error.message));
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

export const createRecipient = async (event, context, callback) => {
  const { data } = parser(event);

  try {
    const result = await recipient.create(db, data);
    callback(null, success(result));
  } catch (err) {
    console.error(err);
    callback(null, failure(err.message));
  }
};

export const getRecipients = async (event, context, callback) => {
  const { params } = parser(event);

  try {
    const result = await recipient.list(db, params.companyCustomerId);
    callback(null, success(result));
  } catch (err) {
    console.error(err);
    callback(null, failure(err.message));
  }
};
