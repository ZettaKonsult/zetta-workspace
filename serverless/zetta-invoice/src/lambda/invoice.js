/* @flow */

/**
 * @date 2018-02
 */

import type { AWSEvent, AWSContext } from 'types/AWS';

import Invoice from '../invoice';
import Customer from '../companyCustomer/';
import RecipientManager from '../recipient';

import { sendInvoice } from '../mail/mail';
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

export const remove = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomerId, invoiceId } = parser(event).data;

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
    const invoiceData = await Invoice.get({
      companyCustomerId,
      invoiceId,
      db,
    });
    const [companyCustomer, { recipients }] = await Promise.all([
      Customer.get({ db, companyCustomerId }),
      RecipientManager.getAll({
        db,
        companyCustomerId,
        recipientIds: invoiceData.recipients,
      }),
    ]);
    let invoice = Invoice.create({ ...invoiceData }).send(
      async invoice =>
        await sendInvoice({
          recipients,
          companyCustomer,
          invoice,
          discount: 0,
        })
    );
    const result = await createInvoice({ db, invoice: invoice.toJson() });
    return success(result);
  } catch (error) {
    return failure(`Could not send invoice mail: ${error.message}`);
  }
};
