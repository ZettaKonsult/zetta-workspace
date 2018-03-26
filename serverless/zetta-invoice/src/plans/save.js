/* @flow */

/**
 * @date 2018-02
 */

import cuid from 'cuid';

import type { DatabaseMethod } from 'types/Database';
import type { Plan } from 'types/Invoice';
import { incrementToNextLowerBound } from 'date-primitive-utils';
import { getDbTable } from '../util/database';

const TableName = getDbTable({ name: 'Plans' });

export default async ({ db, companyCustomerId, plan }) => {
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
