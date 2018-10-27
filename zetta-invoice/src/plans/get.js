/* @flow */

/**
 * @date 2018-02
 */

import type { DatabaseMethod } from 'types/Database';
import { getDbTable } from '../util/database';

const table = getDbTable({ name: 'Plans' });

export default async (params: {
  db: DatabaseMethod,
  planId: string,
  companyCustomerId: string,
}): Promise<{ [string]: any }> => {
  const { db, companyCustomerId, planId } = params;

  try {
    const result = await db('get', {
      TableName: table,
      Key: { id: planId, companyCustomerId },
    });

    return result.Item;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
