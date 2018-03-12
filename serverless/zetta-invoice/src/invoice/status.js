/* @flow */

/**
 * @date 2018-03-07
 */

import type { DatabaseMethod } from 'types/Database';
import type { InvoiceStatus } from 'types/Event';

import { getDbTable } from '../util/database';
import cuid from 'cuid';

const table = getDbTable({ name: 'InvoiceStatuses' });

const newStatus = (params: {
  invoiceId: string,
  createdAt: number,
}): InvoiceStatus => {
  const { createdAt, invoiceId } = params;

  return {
    id: cuid(),
    invoiceId: invoiceId,
    createdAt: createdAt,
    itemStatus: 'pending',
  };
};

const create = async (params: { db: DatabaseMethod, status: InvoiceStatus }) =>
  await put(params);

const put = async (params: { db: DatabaseMethod, status: InvoiceStatus }) => {
  const { db, status } = params;

  try {
    await db('put', {
      TableName: table,
      Item: status,
    });
  } catch (error) {
    throw error;
  }
};

export default { create, newStatus };
