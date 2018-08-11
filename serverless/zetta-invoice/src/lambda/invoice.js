/* @flow */

/**
 * @date 2018-02
 */

import type { AWSEvent, AWSContext } from 'types/AWS';

import Invoice from '../invoice';
import customer from '../companyCustomer/';
import RecipientManager from '../recipient';

import { sendInvoice } from '../mail/mail';
import { parser, failure, success } from '../util';

const { databaseInvoiceGroup, invoiceDatabase } = Invoice;

export const create = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomerId, ...invoice } = parser(event).data;
  try {
    console.log(invoice);
    const newInvoice = Invoice.create(invoice);

    const result = await invoiceDatabase(companyCustomerId).save(
      newInvoice.toJson()
    );
    return success(result);
  } catch (error) {
    return failure(error.message);
  }
};

export const get = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomerId, locked } = parser(event).params;

  try {
    const result = await invoiceDatabase(companyCustomerId).list();
    return success(result);
  } catch (error) {
    return failure(error.message);
  }
};

export const remove = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomerId, invoiceId } = parser(event).data;

  try {
    const result = await invoiceDatabase(companyCustomerId).remove(invoiceId);
    return success(result);
  } catch (error) {
    return failure(error.message);
  }
};

export const send = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomerId, invoiceId } = parser(event).data;

  try {
    const invoiceData = await invoiceDatabase(companyCustomerId).get(invoiceId);

    const [companyCustomer, recipients, sequentialId] = await Promise.all([
      customer.get(companyCustomerId),
      RecipientManager(companyCustomerId).getAll(invoiceData.recipientIds),
      databaseInvoiceGroup(companyCustomerId).generateInvoiceLockId(),
    ]);
    let invoice = Invoice.create({ ...invoiceData })
      .lockInvoice(sequentialId)
      .send(
        async invoice =>
          await sendInvoice({
            recipients,
            companyCustomer,
            invoice,
            discount: 0,
          })
      );

    const result = await invoiceDatabase(companyCustomerId).save(
      invoice.toJson()
    );

    return success(result.Attributes);
  } catch (error) {
    console.error(error);
    return failure(`Could not send invoice mail: ${error.message}`);
  }
};
