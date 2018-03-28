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
}): Promise<{ [string]: any }> => {
  const { db, companyCustomerId } = params;

  console.log(`Fetching invoices for customer ${companyCustomerId}.`);
  try {
    return (await db('query', {
      TableName: INVOICES_TABLE,
      KeyConditionExpression: '#companyCustomer = :companyCustomer',
      ExpressionAttributeNames: {
        '#companyCustomer': 'companyCustomer',
      },
      ExpressionAttributeValues: {
        ':companyCustomer': companyCustomerId,
      },
    })).Items;
  } catch (error) {
    throw error;
  }
};
