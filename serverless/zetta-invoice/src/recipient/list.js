/* @flow */
import type { DatabaseMethod } from 'types/Database';

import { getDbTable } from '../util/database';

const RECIPIENTS_TABLE = getDbTable({ name: 'Recipients' });

export default async (params: {
  db: DatabaseMethod,
  companyCustomerId: string,
}): Promise<{ [string]: any }> => {
  const { db, companyCustomerId } = params;

  console.log(`Fetching recipients for ${companyCustomerId}.`);

  try {
    return (await db('query', {
      TableName: RECIPIENTS_TABLE,
      KeyConditionExpression: '#companyCustomerId = :companyCustomerId',
      ExpressionAttributeNames: {
        '#companyCustomerId': 'companyCustomerId',
      },
      ExpressionAttributeValues: {
        ':companyCustomerId': companyCustomerId,
      },
    })).Items;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
