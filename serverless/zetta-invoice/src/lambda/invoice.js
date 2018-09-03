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
  const companyCustomerId = event.requestContext.identity.cognitoIdentityId;
  const { ...invoice } = parser(event).data;
  try {
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
  const companyCustomerId = event.requestContext.identity.cognitoIdentityId;

  try {
    const result = await invoiceDatabase(companyCustomerId).list();
    return success(result);
  } catch (error) {
    return failure(error.message);
  }
};

export const remove = async (event: AWSEvent, context: AWSContext) => {
  const companyCustomerId = event.requestContext.identity.cognitoIdentityId;
  const { invoiceId } = parser(event).data;

  try {
    const result = await invoiceDatabase(companyCustomerId).remove(invoiceId);
    return success(result);
  } catch (error) {
    return failure(error.message);
  }
};

export const send = async (event: AWSEvent, context: AWSContext) => {
  const companyCustomerId = event.requestContext.identity.cognitoIdentityId;
  const { invoiceId } = parser(event).data;

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

export const lock = async (event: AWSEvent, context: AWSContext) => {
  const companyCustomerId = event.requestContext.identity.cognitoIdentityId;
  const { invoiceId, invoiceGroupId } = parser(event).data;

  try {
    const [invoiceData, sequentialId] = await Promise.all([
      invoiceDatabase(companyCustomerId).get(invoiceId),
      databaseInvoiceGroup(companyCustomerId).generateInvoiceLockId(
        invoiceGroupId
      ),
    ]);
    let invoice = Invoice.create({ ...invoiceData }).lockInvoice(sequentialId);
    const result = await invoiceDatabase(companyCustomerId).save(
      invoice.toJson()
    );
    return success(result);
  } catch (err) {
    console.error(err);
    return failure(`Things went bad in invoice.lock`);
  }
};

export const createGroup = async (event: AWSEvent, context: AWSContext) => {
  const companyCustomerId = event.requestContext.identity.cognitoIdentityId;
  const { name, value } = parser(event).data;

  try {
    const result = await databaseInvoiceGroup(companyCustomerId).create({
      name,
      value,
    });
    return success(result);
  } catch (err) {
    console.error(err);
    return failure(`Could not create invoice group ${name}`);
  }
};

export const removeGroup = async (event: AWSEvent, context: AWSContext) => {
  const companyCustomerId = event.requestContext.identity.cognitoIdentityId;
  const { id } = parser(event).data;
  try {
    const result = await databaseInvoiceGroup(companyCustomerId).remove(id);
    return success(result);
  } catch (err) {
    console.error(err);
    return failure(`Could not remove invoice group ${id}`);
  }
};
