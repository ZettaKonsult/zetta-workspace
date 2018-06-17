/* @flow */

/**
 * @date 2018-02
 */

import type { AWSEvent, AWSContext } from 'types/AWS';
import Invoice from '../invoice';
import createInvoice from '../invoice/create';
import { parser, db, failure, success } from '../util';

export const create = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomerId, invoiceRows, recipientIds } = parser(event).data;

  try {
    const invoice = Invoice.create({
      companyCustomerId,
      invoiceRows,
      recipientIds,
    });
    const result = await createInvoice({ db, invoice: invoice.toJson() });
    return success(result);
  } catch (error) {
    // console.error(error);
    return failure(error.message);
  }
};

export const get = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomerId, locked } = parser(event).params;

  console.log(
    `Received request for invoices for customer: ${companyCustomerId}`
  );

  const isLocked = locked === 'true';
  try {
    const result = await Invoice.list({
      db,
      companyCustomerId,
      locked: isLocked,
    });
    return success(result);
  } catch (error) {
    // console.error(error);
    return failure(error.message);
  }
};

export const getStatus = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomerId, invoiceId } = parser(event).params;

  try {
    const result = (await Invoice.get({
      db,
      companyCustomerId,
      invoiceId,
    })).itemStatus;
    return success(result);
  } catch (error) {
    // console.error(error);
    return failure(error.message);
  }
};

export const lock = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomerId, invoiceId, lock } = parser(event).data;
  console.log(
    `Received request for setting the lock for invoice ${invoiceId}, customer ${companyCustomerId}, to ${lock}.`
  );

  try {
    const result = await Invoice.lock({
      db,
      companyCustomerId,
      invoiceId,
      lock: lock === 'true',
    });
    return success(result);
  } catch (error) {
    // console.error(error);
    return failure(error.message);
  }
};

export const remove = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomerId, invoiceId } = parser(event).data;

  console.log(
    `Received request to remove invoice ${invoiceId}, customer ${companyCustomerId}.`
  );

  try {
    const result = await Invoice.remove({ db, companyCustomerId, invoiceId });
    return success(result);
  } catch (error) {
    // console.error(error);
    return failure(error.message);
  }
};

export const send = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomerId, invoiceId } = parser(event).data;

  try {
    const result = await Invoice.mail({ db, companyCustomerId, invoiceId });
    return success(result);
  } catch (error) {
    console.error(error);
    return failure(`Could not send invoice mail: ${error.message}`);
  }
};

export const update = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomerId, invoiceId, invoiceRows, recipients } = parser(
    event
  ).data;

  try {
    const invoice = (await Invoice.get({
      companyCustomerId,
      invoiceId,
      db,
    })).create({
      invoiceRows,
      recipients,
    });

    const result = await createInvoice({ db, invoice: invoice.toJson() });
    return success(result);
  } catch (error) {
    // console.error(error);
    return failure(error.message);
  }
};
