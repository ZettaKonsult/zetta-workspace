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
  locked: boolean,
}): Promise<{ [string]: any }> => {
  const { db, companyCustomerId, locked } = params;

  try {
    return (await db('query', {
      TableName: INVOICES_TABLE,
      KeyConditionExpression: '#companyCustomerId = :companyCustomerId',
      FilterExpression: '#locked = :locked',
      ExpressionAttributeNames: {
        '#companyCustomerId': 'companyCustomerId',
        '#locked': 'locked',
      },
      ExpressionAttributeValues: {
        ':companyCustomerId': companyCustomerId,
        ':locked': locked,
      },
    })).Items;
  } catch (error) {
    throw error;
  }
};
