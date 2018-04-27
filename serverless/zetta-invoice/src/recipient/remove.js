/* @flow */

/**
 * @date 2018-04-27
 */

import type { DatabaseMethod } from 'types/Database';
import { getDbTable } from '../util/database';

const TableName = getDbTable({ name: 'Recipients' });

export default async (params: {
  db: DatabaseMethod,
  recipientId: string,
  companyCustomerId: string,
}): Promise<{ companyCustomerId: string, recipientId: string }> => {
  const { db, companyCustomerId, recipientId } = params;

  try {
    await db('delete', {
      TableName,
      Key: { id: recipientId, companyCustomerId },
    });

    return { companyCustomerId, recipientId };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
