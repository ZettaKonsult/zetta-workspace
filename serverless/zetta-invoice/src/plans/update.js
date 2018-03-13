/* @flow */
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
    return result;
  }
};
