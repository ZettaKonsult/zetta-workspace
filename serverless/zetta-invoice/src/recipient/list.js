/* @flow */
import type { DatabaseMethod } from 'types/Database';

import { getDbTable } from '../util/database';

const table = getDbTable({ name: 'Recipients' });

export default async (params: {
  db: DatabaseMethod,
  companyCustomerId: string,
}): Promise<{ [string]: any }> => {
  const { db, companyCustomerId } = params;

  console.log(`Fetching invoices for ${companyCustomerId}.`);

  try {
    return (await db('query', {
      TableName: table,
      IndexName: 'companyCustomer',
      KeyConditionExpression: '#companyCustomer = :companyCustomer',
      ExpressionAttributeNames: {
        '#companyCustomer': 'companyCustomer',
      },
      ExpressionAttributeValues: {
        ':companyCustomer': companyCustomerId,
      },
    })).Items;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
