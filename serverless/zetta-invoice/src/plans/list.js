/* @flow */
import { getDbTable } from '../util/database';

type Params = {
  db: DatabaseMethod,
  companyCustomerId: string,
};

const table = getDbTable({ name: 'Plans' });

export default async (params: Params): Promise<{ [string]: any }> => {
  const { db, companyCustomerId } = params;
  try {
    const result = await db('query', {
      TableName: table,
      KeyConditionExpression: 'companyCustomerId = :companyCustomerId',
      ExpressionAttributeValues: {
        ':companyCustomerId': companyCustomerId,
      },
    });

    return result.Items;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
