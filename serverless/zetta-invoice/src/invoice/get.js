/* @flow */

/**
 * @date 2018-03-05
 */

import type { DatabaseMethod } from 'types/Database';
import type { Invoice } from 'types/Invoice';

import { getDbTable } from '../util/database';

const INVOICES_TABLE = getDbTable({ name: 'Invoices' });

export default async (params: {
  db: DatabaseMethod,
  companyCustomerId: string,
  invoiceId: string,
}): Promise<Invoice> => {
  const { db, companyCustomerId, invoiceId } = params;

  console.log(`Fetching invoice ${invoiceId}, customer ${companyCustomerId}.`);

  return (await db('query', {
    TableName: INVOICES_TABLE,
    KeyConditionExpression:
      'companyCustomerId = :companyCustomerId AND id = :id',
    ExpressionAttributeValues: {
      ':companyCustomerId': companyCustomerId,
      ':id': invoiceId,
    },
  })).Items[0];
};
