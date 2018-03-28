/* @flow */

/**
 * @date 2018-03-05
 */

import type { DatabaseMethod } from 'types/Database';

import { getDbTable } from '../util/database';

const INVOICES_TABLE = getDbTable({ name: 'Invoices' });

export default async (params: {
  db: DatabaseMethod,
  invoiceId: string,
  companyCustomerId: string,
  lock: boolean,
}) => {
  const { db, invoiceId, companyCustomerId, lock } = params;

  console.log(
    `Locking invoice ${invoiceId} for customer ${companyCustomerId}.`
  );
  try {
    await db('update', {
      TableName: INVOICES_TABLE,
      Key: {
        companyCustomer: companyCustomerId,
        id: invoiceId,
      },
      UpdateExpression: `Set locked=:locked`,
      ExpressionAttributeValues: {
        ':locked': lock,
      },
    });
  } catch (error) {
    throw error;
  }
};
