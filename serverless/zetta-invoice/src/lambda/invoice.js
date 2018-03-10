/* @flow */

/**
 * @date 2018-02
 */

import type { AWSEvent, AWSContext, AWSCallback } from 'types/AWS';
import Invoice from '../invoice/invoice';

import { success, failure } from '../util/response';
import parser from '../util/parser';
import db from '../util/database';

export const write = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  const { data } = parser(event);

  try {
    const result = await Invoice.create({ db, data });
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

  try {
    await Invoice.mail({ db, companyCustomerId, invoiceId });
    callback(null, success());
  } catch (err) {
    console.error(err);
    callback(null, failure(err.message));
  }
};

export const get = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  const { companyCustomerId } = parser(event).data;

  try {
    const result = await Invoice.list({ db, companyCustomerId });
    callback(null, success(result));
  } catch (error) {
    console.error(error);
    callback(null, failure(error.message));
  }
};

const getStatus = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  const { invoiceId } = parser(event).data;
  try {
    callback(null, await Invoice.getStatus({ db, invoiceId }));
  } catch (error) {
    console.error(error);
    callback(null, failure(error.message));
  }
};

const confirm = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  const { invoiceId } = parser(event).data;
  try {
    await Invoice.updateStatus({ db, invoiceId, newStatus: 'succeeded' });
    callback(null, await Invoice.getStatus({ db, invoiceId }));
  } catch (error) {
    console.error(error);
    callback(null, failure(error.message));
  }
};

export default { confirm, get, getStatus, send, write };
