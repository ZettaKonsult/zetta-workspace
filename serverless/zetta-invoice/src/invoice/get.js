/* @flow */

/**
 * @date 2018-03-05
 */

import type { DatabaseMethod } from 'types/Database';

import { getDbTable } from '../util/database';

const INVOICES_TABLE = getDbTable({ name: 'Invoices' });

export default async (params: {
  db: DatabaseMethod,
  companyCustomerId: string,
  invoiceId: string,
}): Promise<{ [string]: any }> => {
  const { db, companyCustomerId, invoiceId } = params;

  console.log(`Fetching invoice ${invoiceId}, customer ${companyCustomerId}.`);

  return (await db('query', {
    TableName: INVOICES_TABLE,
    KeyConditionExpression: 'companyCustomer = :companyCustomerId AND id = :id',
    ExpressionAttributeValues: {
      ':companyCustomerId': companyCustomerId,
      ':id': invoiceId,
    },
  })).Items[0];
};
