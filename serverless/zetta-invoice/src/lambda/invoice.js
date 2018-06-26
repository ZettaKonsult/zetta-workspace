/* @flow */

/**
 * @date 2018-02
 */

import type { AWSEvent, AWSContext } from 'types/AWS';

import Invoice from '../invoice';
import Customer from '../companyCustomer/';
import RecipientManager from '../recipient';

import { sendInvoice } from '../mail/mail';
import { parser, db, failure, success } from '../util';
import { getDbTable } from '../util/database';

const TableName = getDbTable({ name: 'Invoices' });
const database = Invoice.invoiceDatabase(db)(TableName);

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
    const [companyCustomer, { recipients }] = await Promise.all([
      Customer.get({ db, companyCustomerId }),
      RecipientManager.getAll({
        db,
        companyCustomerId,
        recipientIds: invoiceData.recipients,
      }),
    ]);
    const sequentialId = await database(
      'companyCustomer1'
    ).generateInvoiceLockId('invoiceGroup1');
    let invoice = Invoice.create({ ...invoiceData, sequentialId }).send(
      async invoice =>
        await sendInvoice({
          recipients,
          companyCustomer,
          invoice,
          discount: 0,
        })
    );
    console.log(invoice.toJson());
    const result = await database(companyCustomerId).save(invoice.toJson());
    return success(result);
  } catch (error) {
    return failure(`Could not send invoice mail: ${error.message}`);
  }
};
