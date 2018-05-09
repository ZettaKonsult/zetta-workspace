/* @flow */

/**
 * @date 2018-02
 */

import type { AWSEvent, AWSContext } from 'types/AWS';
import Invoice from '../invoice';
import Status from '../invoice/status';

import { parser, db, failure, success } from '../util';

export const create = async (event: AWSEvent, context: AWSContext) => {
  const {
    createdAt,
    invoiceId,
    companyCustomerId,
    invoiceRows,
    recipientIds,
  } = parser(event).data;

  console.log(
    `Received request for creating an invoice for customer ${companyCustomerId}.`
  );
  console.log(`Recipients:`);
  console.log(recipientIds);
  console.log(`Invoice rows:`);
  console.log(invoiceRows);

  try {
    const result = await Invoice.create({
      db,
      createdAt,
      invoiceId,
      companyCustomerId,
      invoiceRows,
      recipientIds,
    });

    return success(result);
  } catch (error) {
    console.error(error);
    return failure(error.message);
  }
};

export const confirm = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomerId, invoiceId } = parser(event).params;

  try {
    let result = {};
    result.update = await Status.update({
      db,
      companyCustomerId,
      invoiceId,
      newStatus: 'succeeded',
    });
    result.get = await Status.get({ db, companyCustomerId, invoiceId });
    return success(result);
  } catch (error) {
    console.error(error);
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
    console.error(error);
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
    console.error(error);
    return failure(error.message);
  }
};

export const getStatuses = async (event: AWSEvent, context: AWSContext) => {
  const { invoiceId } = parser(event).params;

  try {
    const result = await Status.get({ db, invoiceId });
    return success(result);
  } catch (error) {
    console.error(error);
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
    console.error(error);
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
    console.error(error);
    return failure(error.message);
  }
};

export const removeStatuses = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomerId, invoiceId } = parser(event).params;

  console.log(`Received request to remove invoice statuses for ${invoiceId}.`);

  let result = [];
  try {
    const statuses = await Status.get({ db, companyCustomerId, invoiceId });
    statuses.forEach(async status =>
      result.push(await Status.remove({ db, invoiceId, statusId: status.id }))
    );
    return success(result);
  } catch (error) {
    console.error(error);
    return failure(error.message);
  }
};

export const send = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomerId, invoiceId } = parser(event).data;

  console.log(
    `Received invoice mail request for ${invoiceId}, customer ${companyCustomerId}.`
  );

  try {
    const result = await Invoice.mail({ db, companyCustomerId, invoiceId });
    return success(result);
  } catch (error) {
    console.error(error);
    return failure(error.message);
  }
};

export const update = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomerId, invoiceId, invoiceRows, recipients } = parser(
    event
  ).data;

  console.log(
    `Received invoice update request for ${invoiceId}, customer ${companyCustomerId}.`
  );

  console.log(`Recipients:`);
  console.log(recipients);
  console.log(`Invoice rows:`);
  console.log(invoiceRows);

  try {
    const result = await Invoice.update({
      db,
      companyCustomerId,
      invoiceId,
      invoiceRows,
      recipients,
    });
    return success(result);
  } catch (error) {
    console.error(error);
    return failure(error.message);
  }
};
