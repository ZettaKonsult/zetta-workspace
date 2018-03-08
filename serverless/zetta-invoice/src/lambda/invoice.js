import invoice, { createInvoice, mailInvoice } from '../invoice/invoice';

import { success, failure } from './util/response';
import parser from './util/parser';
import db from './util/database';

export const writeInvoice = async (event, context, callback) => {
  const { data } = parser(event);

  try {
    const result = await createInvoice(db, data);
    callback(null, success(result));
  } catch (error) {
    console.error(error);
    callback(null, failure(error.message));
  }
};

export const sendInvoice = async (event, context, callback) => {
  const { companyCustomerId, invoiceId } = parser(event).data;

  try {
    await mailInvoice(db, companyCustomerId, invoiceId);
    callback(null, success());
  } catch (err) {
    console.error(err);
    callback(null, failure(err.message));
  }
};

export const getInvoices = async (event, context, callback) => {
  const { params } = parser(event);

  try {
    const result = await invoice.list(db, params.companyCustomerId);
    callback(null, success(result));
  } catch (error) {
    console.error(error);
    callback(null, failure(error.message));
  }
};
