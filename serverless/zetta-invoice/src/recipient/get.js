/* @flow */
import type { DatabaseMethod } from 'types/Database';

import { getDbTable } from '../util/database';

const table = getDbTable({ name: 'Recipients' });

export default async (params: {
  db: DatabaseMethod,
  companyCustomerId: string,
}): Promise<Recipient> => {
  const { db, companyCustomerId } = params;

  console.log(`Fetching recipients for customer ${companyCustomerId}.`);
  console.log({
    TableName: table,
    Key: { companyCustomer: companyCustomerId, recipientId: 'recipientId' },
  });
  const result = await db('get', {
    TableName: table,
    Key: { companyCustomer: companyCustomerId, recipientId: 'recipientId' },
  });
  return result.Item;
};
