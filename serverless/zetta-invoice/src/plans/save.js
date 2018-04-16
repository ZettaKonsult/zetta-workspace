/* @flow */

/**
 * @date 2018-02
 */

import cuid from 'cuid';

import type { DatabaseMethod } from 'types/Database';
import type { Plan } from 'types/Invoice';
import { getDbTable } from '../util/database';

const TableName = getDbTable({ name: 'Plans' });

export default async (params: {
  db: DatabaseMethod,
  companyCustomerId: string,
  plan: Plan,
}) => {
  const { db, companyCustomerId, plan } = params;

  const newPlan = {
    ...plan,
    id: cuid(),
    epochNextProcess: Date.now(),
    recipientIds: [],
    companyCustomerId,
  };

  await db('put', {
    TableName,
    Item: newPlan,
  });

  return newPlan;
};
