/* @flow */

/**
 * @date 2018-02
 */

import type { DatabaseMethod } from 'types/Database';
import { getDbTable } from '../util/database';

const TableName = getDbTable({ name: 'Plans' });

export default async (params: {
  db: DatabaseMethod,
  planId: string,
  companyCustomerId: string,
}): Promise<{ companyCustomerId: string, planId: string }> => {
  const { db, companyCustomerId, planId } = params;

  try {
    await db('delete', {
      TableName,
      Key: { id: planId, companyCustomerId },
    });

    return { companyCustomerId, planId };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
