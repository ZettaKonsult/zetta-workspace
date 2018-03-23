/* @flow */

/**
 * @date 2018-02
 */

import type { AWSEvent, AWSContext, AWSCallback } from 'types/AWS';
import Invoice from '../invoice/invoice';

import { success, failure } from '../util/response';
import parser from '../util/parser';
import db from '../util/database';

export const confirm = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  const { companyCustomerId, invoiceId } = parser(event).params;
  try {
    let result = {};
    result.update = await Invoice.updateStatus({
      db,
      companyCustomerId,
      invoiceId,
      newStatus: 'succeeded',
    });
    result.get = await Invoice.getStatus({ db, companyCustomerId, invoiceId });
    callback(null, success(result));
  } catch (error) {
    console.error(error);
    callback(null, failure(error.message));
  }
};

export const get = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  const { companyCustomerId } = parser(event).params;
  console.log(
    `Received request for invoices for customer ${companyCustomerId}.`
  );

  try {
    const result = await Invoice.list({ db, companyCustomerId });
    console.log(success(result));
    callback(null, success(result));
  } catch (error) {
    console.error(error);
    callback(failure(error.message));
  }
};

export const getStatus = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  const { companyCustomerId, invoiceId } = parser(event).params;
  console.log(`parser(event).params`);
  try {
    const result = await Invoice.getStatus({
      db,
      companyCustomerId,
      invoiceId,
    });
    callback(null, success(result));
  } catch (error) {
    console.error(error);
    callback(null, failure(error.message));
  }
};

export const getStatuses = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  const { invoiceId } = parser(event).params;
  try {
    const result = await Invoice.getStatuses({ db, invoiceId });
    callback(null, success(result));
  } catch (error) {
    console.error(error);
    callback(null, failure(error.message));
  }
};

export const send = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  const { companyCustomerId, invoiceId } = parser(event).data;

  console.log(
    `Received invoice mail request for ${invoiceId}, customer ${companyCustomerId}.`
  );

  try {
    const result = await Invoice.mail({ db, companyCustomerId, invoiceId });
    callback(null, success(result));
  } catch (error) {
    console.error(error);
    callback(null, failure(error.message));
  }
};

export const write = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  const { invoice, companyCustomerId } = parser(event).data;

  try {
    const result = await Invoice.newInvoice({ db, invoice, companyCustomerId });
    callback(null, success(result));
  } catch (error) {
    console.error(error);
    callback(null, failure(error.message));
  }
};
