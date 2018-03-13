/* @flow */
import { getDbTable } from '../util/database';

type Params = {
  db: DatabaseMethod,
  companyCustomerId: string,
};

const table = getDbTable({ name: 'Plans' });

export default async (params: Params): Promise<{ [string]: any }> => {
  const { db, companyCustomerId, id } = params;
  try {
    const result = await db('get', {
      TableName: table,
      Key: { id, companyCustomerId },
    });

    return result.Item;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
