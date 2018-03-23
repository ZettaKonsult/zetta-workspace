/* @flow */
import type { DatabaseMethod } from 'types/Database';
import type { Recipient } from 'types/Recipient';

import { getDbTable } from '../util/database';

const RECIPIENTS_TABLE = getDbTable({ name: 'Recipients' });

const get = async (params: {
  db: DatabaseMethod,
  companyCustomerId: string,
  recipientId: string,
}): Promise<Recipient> => {
  const { db, companyCustomerId, recipientId } = params;

  console.log(
    `Fetching recipient ${recipientId}, customer ${companyCustomerId}.`
  );

  return (await db('query', {
    TableName: RECIPIENTS_TABLE,
    KeyConditionExpression:
      'companyCustomerId = :companyCustomerId AND id = :id',
    ExpressionAttributeValues: {
      ':companyCustomerId': companyCustomerId,
      ':id': recipientId,
    },
  })).Items[0];
};

const getAll = async (params: {
  db: DatabaseMethod,
  companyCustomerId: string,
}): Promise<Recipient> => {
  const { db, companyCustomerId } = params;

  console.log(`Fetching recipients for customer ${companyCustomerId}.`);
  const result = await db('get', {
    TableName: RECIPIENTS_TABLE,
    Key: { companyCustomerId },
  });
  return result.Item;
};

export default { get, getAll };
