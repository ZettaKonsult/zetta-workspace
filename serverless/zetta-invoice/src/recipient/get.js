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
}): Promise<Recipient> => {
  const { db, companyCustomerId } = params;

  console.log(`Fetching recipients for customer ${companyCustomerId}.`);
  const result = await db('get', {
    TableName: RECIPIENTS_TABLE,
    Key: { companyCustomerId },
  });
  return result.Items;
};

export default { get, getAll };
