/* @flow */

/**
 * @date 2018-03-05
 */

import type { DatabaseMethod } from 'types/Database';

import { getDbTable } from '../util/database';
import Status from './status';

import cuid from 'cuid';

const INVOICES_TABLE = getDbTable({ name: 'Invoices' });

export default async (params: {
  db: DatabaseMethod,
  invoiceId: string,
  companyCustomerId: string,
  invoiceRows: Array<InvoiceRow>,
  recipientIds: Array<string>,
}): Promise<Invoice> => {
  const {
    db,
    companyCustomerId,
    invoiceId,
    invoiceRows,
    recipientIds,
  } = params;

  validate({
    companyCustomerId,
    invoiceId,
    invoiceRows,
    recipientIds,
  });

  const creation = Date.now();
  const id = invoiceId || cuid();

  console.log(`Creating status ${id} at ${creation}.`);
  const itemStatus = await Status.create({
    db,
    invoiceId: id,
    createdAt: creation,
  });

  const invoice = {
    id,
    createdAt: creation,
    companyCustomer: companyCustomerId,
    invoiceRows,
    recipients: recipientIds,
    itemStatus,
    locked: false,
  };

  console.log(`Successfully attached status to invoice. Creating...`);
  try {
    await db('put', {
      TableName: INVOICES_TABLE,
      Item: invoice,
    });

    console.log(`Successfully created invoice.`);
    return invoice;
  } catch (error) {
    throw error;
  }
};

const validate = (params: {
  companyCustomerId: string,
  invoiceRows: Array<InvoiceRow>,
  recipientIds: Array<string>,
}): {
  companyCustomerId: string,
  invoiceRows: Array<InvoiceRow>,
  recipientIds: Array<string>,
} => {
  const { companyCustomerId, invoiceRows, recipientIds } = params;

  if (!companyCustomerId) {
    throw new Error('Company customer ID required!');
  }
  if (invoiceRows.length <= 0) {
    throw new Error(
      'At least one invoice row is required for to create an invoice!'
    );
  }
  if (recipientIds.length <= 0) {
    throw new Error(
      'At least one recipient ID is required for to create an invoice!'
    );
  }

  return params;
};
