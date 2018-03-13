/* @flow */
import { getDbTable } from '../util/database';
import get from './get';
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

export const getPlansToPay = async ({ db }) => {
  /*
  send invoice
  wait until interval + intervalCount has passed
  send invoice again
  */

  const result = await addRecipientToPlan({
    db,
    recipientId: 'recipientId',
    id: 'plan1',
    companyCustomerId: 'companyCustomerId123',
  });
  return result;
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

export const addRecipientToPlan = async ({
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
    return result;
  }
};
