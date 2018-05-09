/* @flow */

/**
 * @date 2018-04-27
 */

import type { DatabaseMethod } from 'types/Database';
import { getDbTable } from '../util/database';

const TableName = getDbTable({ name: 'CompanyCustomers' });

export default async (params: {
  db: DatabaseMethod,
  companyCustomerId: string,
}): Promise<{ companyCustomerId: string }> => {
  const { db, companyCustomerId } = params;

  try {
    await db('delete', {
      TableName,
      Key: { id: companyCustomerId },
    });

    return { companyCustomerId };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
