/* @flow */

/**
 * @date 2018-03-05
 */

import type { DatabaseMethod } from 'types/Database';
import type { InvoiceRow, UnlockedInvoice } from 'types/Invoice';
import type { Recipient } from 'types/Recipient';

import { getDbTable } from '../util/database';
import get from './get';

const INVOICES_TABLE = getDbTable({ name: 'Invoices' });

export default async (params: {
  db: DatabaseMethod,
  invoice: Object,
}): Promise<boolean> => {
  const { db, invoice } = params;

  await db('put', {
    TableName: INVOICES_TABLE,
    Item: invoice,
  });

  return true;
};
