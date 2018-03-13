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

export const getAllPlansToProcess = async ({ db }) => {
  const result = await db('query', {
    TableName: table,
    KeyConditionExpression: 'companyCustomerId = :companyCustomerId',
    FilterExpression: 'epochNextProcess < :epochNextProcess',
    ExpressionAttributeValues: {
      ':companyCustomerId': 'companyCustomerId123',
      ':epochNextProcess': Date.now(),
    },
  });
  return result.Items;
};
