/* @flow */

/**
 * @date 2018-03-05
 */

import type { DatabaseMethod } from 'types/Database';
import type { Invoice } from 'types/Invoice';

import { getDbTable } from '../util/database';

const TableName = getDbTable({ name: 'Invoices' });

export default async (params: {
  db: DatabaseMethod,
  companyCustomerId: string,
  invoiceId: string,
}): Promise<Invoice> => {
  const { db, companyCustomerId, invoiceId } = params;

  const result = await db('get', {
    TableName,
    Key: {
      companyCustomerId: companyCustomerId,
      id: invoiceId,
    },
  });
  if (result.Item == null) {
    throw new Error(`No such invoice (${invoiceId})!`);
  }

  return result.Item;
};
