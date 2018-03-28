/* @flow */

/**
 * @date 2018-03-05
 */

import type { DatabaseMethod } from 'types/Database';
import type { Invoice } from 'types/Invoice';

import { getDbTable } from '../util/database';
import get from './get';

const INVOICES_TABLE = getDbTable({ name: 'Invoices' });

export default async (params: {
  db: DatabaseMethod,
  invoice: Invoice,
}): Promise<boolean> => {
  const { db, invoice } = params;
  const { id, invoiceRows, companyCustomer, recipients } = invoice;
  const invoiceId = id;
  const companyCustomerId =
    typeof companyCustomer === 'string' ? companyCustomer : companyCustomer.id;

  if ((await get({ db, invoiceId, companyCustomerId })).locked) {
    throw new Error(`Can not update locked invoice ${invoiceId}!`);
  }

  console.log(`Updating invoice ${invoiceId}, customer ${companyCustomerId}.`);
  try {
    await db('update', {
      TableName: INVOICES_TABLE,
      Key: {
        companyCustomer: companyCustomerId,
        id,
      },
      ConditionExpression: 'locked=:shouldNotBeLocked',
      UpdateExpression: `Set invoiceRows = :invoiceRows, recipients = :recipients`,
      ExpressionAttributeValues: {
        ':shouldNotBeLocked': false,
        ':invoiceRows': invoiceRows,
        ':recipients': recipients,
      },
    });
    return true;
  } catch (error) {
    throw error;
  }
};
