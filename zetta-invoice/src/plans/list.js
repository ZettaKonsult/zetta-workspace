/* @flow */

/**
 * @date 2018-02
 */

import type { DatabaseMethod } from 'types/Database';
import { getDbTable } from '../util/database';

const table = getDbTable({ name: 'Plans' });

export const list = async (params: {
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

  const result = await db('scan', {
    TableName: table,
    FilterExpression: 'epochNextProcess <= :epochNextProcess',
    ExpressionAttributeValues: {
      ':epochNextProcess': epoch,
    },
  });
  return result.Items;
};

export const createPlansMapping = async ({ db, companyCustomerId }) => {
  const allPlans = await list({ db, companyCustomerId });
  const result = allPlans.reduce((total, plan) => {
    return {
      ...total,
      ...plan.labels.reduce((allLabels, label) => {
        let old = total[label] === undefined ? [] : total[label];
        return { ...allLabels, [label]: [...old, plan.id] };
      }, {}),
    };
  }, {});
  return result;
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
