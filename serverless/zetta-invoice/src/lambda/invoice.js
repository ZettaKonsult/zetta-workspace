/* @flow */

/**
 * @date 2018-02
 */

import type { AWSEvent, AWSContext } from 'types/AWS';

import Invoice from '../invoice';
import customer from '../companyCustomer/';
import RecipientManager from '../recipient';

import { sendInvoice } from '../mail/mail';
import { parser, db, failure, success } from '../util';

const database = Invoice.invoiceDatabase;

export const create = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomerId, invoiceRows, recipientIds } = parser(event).data;
  try {
    const invoice = Invoice.create({
      invoiceRows,
      recipientIds,
    });
    const result = await database(companyCustomerId).save(invoice.toJson());
    return success(result);
  } catch (error) {
    return failure(error.message);
  }
};

export const get = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomerId, locked } = parser(event).params;
  const isLocked = locked === 'true';

  try {
    const result = await database(companyCustomerId).list(isLocked);
    return success(result);
  } catch (error) {
    return failure(error.message);
  }
};

export const remove = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomerId, invoiceId } = parser(event).data;

  try {
    const result = await database(companyCustomerId).remove(invoiceId);
    return success(result);
  } catch (error) {
    return failure(error.message);
  }
};

export const send = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomerId, invoiceId } = parser(event).data;

  try {
    const invoiceData = await database(companyCustomerId).get(invoiceId);
    const [companyCustomer, { recipients }, sequentialId] = await Promise.all([
      customer.get(companyCustomerId),
      RecipientManager.getAll({
        db,
        companyCustomerId,
        recipientIds: invoiceData.recipients,
      }),
      database('companyCustomer1').generateInvoiceLockId('invoiceGroup1'),
    ]);
    let invoice = Invoice.create({ ...invoiceData, sequentialId }).send(
      async invoice =>
        await sendInvoice({
          recipients,
          companyCustomer,
          invoice,
          discount: 0,
        })
    );

    const result = await database(companyCustomerId).save(invoice.toJson());
    return success(result);
  } catch (error) {
    return failure(`Could not send invoice mail: ${error.message}`);
  }
};
