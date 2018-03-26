/* @flow */

/**
 * @date 2018-02
 */

import type { DatabaseMethod } from 'types/Database';
import { getDbTable } from '../util/database';

const table = getDbTable({ name: 'Plans' });

export default async (params: {
  db: DatabaseMethod,
  companyCustomerId: string,
}): Promise<{ [string]: any }> => {
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

export const listAllPlansToProcess = async (params: {
  db: DatabaseMethod,
  epoch: number,
}) => {
  const { db, epoch } = params;

  const result = await db('query', {
    TableName: table,
    KeyConditionExpression: 'companyCustomerId = :companyCustomerId',
    FilterExpression: 'epochNextProcess < :epochNextProcess',
    ExpressionAttributeValues: {
      ':companyCustomerId': 'companyCustomerId123',
      ':epochNextProcess': epoch,
    },
  });
  return result.Items;
};

export const getPlansToPay = async (params: { db: DatabaseMethod }) => {
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
