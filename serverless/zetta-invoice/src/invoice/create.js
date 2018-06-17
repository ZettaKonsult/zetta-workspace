/* @flow */

/**
 * @date 2018-03-05
 */

import type { UnlockedInvoice, InvoiceRow } from 'types/Invoice';
import type { DatabaseMethod } from 'types/Database';

import { getDbTable } from '../util/database';
import Status from './status';

import cuid from 'cuid';

const INVOICES_TABLE = getDbTable({ name: 'Invoices' });

export default async (params: {
  db: DatabaseMethod,
  invoice: Object,
}): Promise<UnlockedInvoice> => {
  const { db } = params;
  const invoice = {
    ...params.invoice,
    id: params.invoice.id ? params.invoice.id : cuid(),
  };

  try {
    await db('put', {
      TableName: INVOICES_TABLE,
      Item: invoice,
    });

    return invoice;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
