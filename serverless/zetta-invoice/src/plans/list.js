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

export const getPlansToPay = async ({ db }) => {
  /*
  Add a recipient to plan
  send invoice
  wait until interval + intervalCount has passed
  send invoice again
  */
  const recipientId = 'recipient1';
  console.log('start getPlansToPay()');
  const result = await addRecipientToPlan({ db, recipientId });
  console.log('Retun update result');
  return result;
};

export const addRecipientToPlan = async ({ db, recipientId }) => {
  const result = await db('update', {
    TableName: table,
    Key: {
      companyCustomerId: 'companyCustomerId123',
      id: 'plan1',
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
};
