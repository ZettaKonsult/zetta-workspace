/* @flow */
import type { DatabaseMethod } from 'types/Database';
import type { Recipient } from 'types/Recipient';

import { getDbTable } from '../util/database';

const RECIPIENTS_TABLE = getDbTable({ name: 'Recipients' });

const get = async (params: {
  db: DatabaseMethod,
  companyCustomerId: string,
  recipientId: string,
}): Promise<Array<Recipient>> => {
  const { db, companyCustomerId, recipientId } = params;

  console.log(
    `Fetching recipient ${recipientId} with customer ${companyCustomerId}.`
  );

  return (await db('get', {
    TableName: RECIPIENTS_TABLE,
    Key: { id: recipientId, companyCustomerId },
  })).Item;
};

const getAll = async (params: {
  db: DatabaseMethod,
  companyCustomerId: string,
  recipientIds: Array<string>,
}): Promise<{ recipients: Array<Recipient>, missing: Array<string> }> => {
  const { db, recipientIds, companyCustomerId } = params;

  return recipientIds.reduce(
    async ({ missing, recipients }, recipientId) => {
      const recipient = await get({
        db,
        companyCustomerId,
        recipientId,
      });

      recipient == null
        ? missing.push(recipientId)
        : recipients.push(recipient);

      return { missing, recipients };
    },
    { missing: [], recipients: [] }
  );
};

const getBySSN = async ({ db, ssn }: { ssn: string }): Promise<Object> => {
  const result = await db('query', {
    TableName: RECIPIENTS_TABLE,
    IndexName: 'ssn',
    KeyConditionExpression: '#ssn = :ssn',
    ExpressionAttributeNames: {
      '#ssn': 'ssn',
    },
    ExpressionAttributeValues: {
      ':ssn': ssn,
    },
  });
  return result.Items[0];
};

export { get, getAll, getBySSN };
