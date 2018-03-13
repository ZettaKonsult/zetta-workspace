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

export const listAllPlansToProcess = async ({ db }) => {
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

export const getPlansToPay = async ({ db }) => {
  /*
  send invoice
  wait until interval + intervalCount has passed
  send invoice again
  // */
  // const result = await addRecipientToPlan({
  //   db,
  //   recipientId: 'recipientId',
  //   id: 'plan1',
  //   companyCustomerId: 'companyCustomerId123',
  // });
  // return result;
};
