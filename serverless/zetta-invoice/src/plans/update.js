/* @flow */

/**
 * @date 2018-02
 */

import type { DatabaseMethod } from 'types/Database';
import type { Plan } from 'types/Invoice';
import { incrementToNextLowerBound } from 'date-primitive-utils';
import { getDbTable } from '../util/database';
import get from './get';

const PLANS_TABLE = getDbTable({ name: 'Plans' });

export const updateRecipientIds = async (params: {
  db: DatabaseMethod,
  companyCustomerId: string,
  planId: string,
  recipientId: string,
}) => {
  const { db, companyCustomerId, planId, recipientId } = params;

  const plan = await get({ db, companyCustomerId, planId });
  const index = plan.recipientIds.findIndex(id => recipientId === id);
  if (index !== -1) {
    return plan;
  } else {
    const result = await db('update', {
      TableName: PLANS_TABLE,
      Key: {
        companyCustomerId,
        id: planId,
      },
      ReturnValues: 'ALL_NEW',
      UpdateExpression: `set #recipientIds = list_append(if_not_exists(#recipientIds, :empty_list), :recipientId)`,
      ExpressionAttributeNames: {
        '#recipientIds': 'recipientIds',
      },
      ExpressionAttributeValues: {
        ':recipientId': [recipientId],
        ':empty_list': [],
      },
    });
    return result.Attributes;
  }
};

export const updateNextProcess = async (params: {
  db: DatabaseMethod,
  plans: Array<Plan>,
}) => {
  const { db, plans } = params;

  const updatePromise = plans.map(item => {
    return db('update', {
      TableName: PLANS_TABLE,
      Key: {
        companyCustomerId: item.companyCustomerId,
        id: item.id,
      },
      ReturnValues: 'ALL_NEW',
      UpdateExpression: 'set #epochNextProcess = :epochNextProcess',
      ExpressionAttributeNames: {
        '#epochNextProcess': 'epochNextProcess',
      },
      ExpressionAttributeValues: {
        ':epochNextProcess': incrementToNextLowerBound(
          item.epochNextProcess,
          item.intervalCount
        ),
      },
    });
  });
  const result = await Promise.all(updatePromise);
  return result.map(resObject => resObject.Attributes);
};
