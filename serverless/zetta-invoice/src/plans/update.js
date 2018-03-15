/* @flow */
import { incrementToNextLowerBound } from 'date-primitive-utils';

import { getDbTable } from '../util/database';

import get from './get';

type Params = {
  db: DatabaseMethod,
  companyCustomerId: string,
};

const table = getDbTable({ name: 'Plans' });

export const updateRecipientIds = async ({
  db,
  companyCustomerId,
  id,
  recipientId,
}) => {
  const plan = await get({ db, companyCustomerId, id });
  const index = plan.recipientIds.findIndex(id => recipientId === id);
  if (index !== -1) {
    return plan;
  } else {
    const result = await db('update', {
      TableName: table,
      Key: {
        companyCustomerId,
        id,
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

export const updateNextProcess = async ({ db, plans }) => {
  const updatePromise = plans.map(item => {
    return db('update', {
      TableName: table,
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
