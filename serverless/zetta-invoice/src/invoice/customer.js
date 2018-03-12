/* @flow */

/**
 * @date 2018-03-07
 */

import type { DatabaseMethod } from 'types/Database';
import { getDbTable } from '../util/database';

const table = getDbTable({ name: 'CompanyCustomersTable' });

const get = async (params: {
  db: DatabaseMethod,
  companyCustomerId: string,
}): Promise<{ [string]: any }> => {
  const { db, companyCustomerId } = params;
  console.log(`Fetching customer ${companyCustomerId}.`);

  try {
    const result = await db('get', {
      TableName: table,
      Key: { id: companyCustomerId },
    });
    return result.Item;
  } catch (error) {
    throw error;
  }
};

export default { get };
