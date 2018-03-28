/* @flow */

/**
 * @date 2018-03-07
 */

import type { DatabaseMethod } from 'types/Database';
import type { InvoiceStatus } from 'types/InvoiceStatus';

import { getDbTable } from '../util/database';
import cuid from 'cuid';

const INVOICES_TABLE = getDbTable({ name: 'Invoices' });
const INVOICESTATUS_TABLE = getDbTable({ name: 'InvoiceStatuses' });

const create = async (params: {
  db: DatabaseMethod,
  invoiceId: string,
  createdAt: number,
}): InvoiceStatus => {
  const { db, invoiceId, createdAt } = params;

  const status = {
    id: cuid(),
    invoiceId: invoiceId,
    createdAt: createdAt,
    itemStatus: 'pending',
  };

  console.log(
    `Creating status ${status.id} '${status.itemStatus}' for invoice ${
      status.invoiceId
    }.`
  );

  try {
    await db('put', {
      TableName: INVOICESTATUS_TABLE,
      Item: status,
    });
    return status;
  } catch (error) {
    throw error;
  }
};

const get = async (params: {
  db: DatabaseMethod,
  invoiceId: string,
}): Promise<{ [string]: any }> => {
  const { db, invoiceId } = params;

  console.log(`Fetching statuses for invoice ${invoiceId}.`);

  return (await db('query', {
    TableName: INVOICESTATUS_TABLE,
    KeyConditionExpression: '#invoiceId = :invoiceId',
    ExpressionAttributeNames: {
      '#invoiceId': 'invoiceId',
    },
    ExpressionAttributeValues: {
      ':invoiceId': invoiceId,
    },
  })).Items;
};

const remove = async (params: {
  db: DatabaseMethod,
  invoiceId: string,
  statusId: string,
}): Promise<boolean> => {
  const { db, invoiceId, statusId } = params;

  console.log(`Removing invoice status ${statusId} for invoice ${invoiceId}.`);

  try {
    await db('delete', {
      TableName: INVOICESTATUS_TABLE,
      Key: { id: statusId, invoiceId },
    });

    console.log(`Successfully removed invoice status ${statusId}.`);
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const update = async (params: {
  db: DatabaseMethod,
  invoiceId: string,
  newStatus: string,
}) => {
  const { db, invoiceId, newStatus } = params;

  console.log(
    `Updating invoice status for invoice ${invoiceId} to ${newStatus}.`
  );
  try {
    await db('update', {
      TableName: INVOICES_TABLE,
      Key: {
        id: invoiceId,
      },
      ConditionExpression: 'locked=:shouldNotBeLocked',
      UpdateExpression: `Set itemStatus = :itemStatus`,
      ExpressionAttributeValues: {
        ':itemStatus': newStatus,
      },
    });
  } catch (error) {
    throw error;
  }
};

export default { create, get, remove, update };
