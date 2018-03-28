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
}): Promise<boolean> => {
  const { db, companyCustomerId, invoiceId } = params;

  console.log(`Removing invoice ${invoiceId}, customer ${companyCustomerId}.`);

  try {
    await db('delete', {
      TableName: INVOICES_TABLE,
      Key: { id: invoiceId, companyCustomer: companyCustomerId },
    });

    console.log(`Successfully removed invoice ${invoiceId}.`);
    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
