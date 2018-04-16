/* @flow */

/**
 * @date 2018-03-05
 */

import type { DatabaseMethod } from 'types/Database';
import type { InvoiceRow, UnlockedInvoice } from 'types/Invoice';
import type { Recipient } from 'types/Recipient';

import { getDbTable } from '../util/database';
import get from './get';

const INVOICES_TABLE = getDbTable({ name: 'Invoices' });

export default async (params: {
  db: DatabaseMethod,
  invoiceId: string,
  companyCustomerId: string,
  invoiceRows: Array<InvoiceRow>,
  recipients: Array<Recipient>,
}): Promise<boolean> => {
  const { db, invoiceId, companyCustomerId, invoiceRows, recipients } = params;
  if (
    (invoiceRows == null || invoiceRows.length === 0) &&
    (recipients == null || recipients.length === 0)
  ) {
    throw new Error(
      `Neither new invoice rows nor new recipients were specified when` +
        ` updating invoice ${invoiceId}, customer ${companyCustomerId}.`
    );
  }

  let oldInvoice = await get({ db, invoiceId, companyCustomerId });
  console.log(`Fetched old invoice:`);
  console.log(oldInvoice);

  if (oldInvoice.locked) {
    throw new Error(`Can not update locked invoice ${invoiceId}!`);
  }

  let newInvoice = { invoiceRows, recipients };
  Object.keys(oldInvoice).forEach(key => {
    if (newInvoice[key] == null) {
      newInvoice[key] = oldInvoice[key];
    }
  });

  console.log(`Updating invoice ${invoiceId}, customer ${companyCustomerId}.`);
  console.log(`New invoice:`);
  console.log(newInvoice);

  try {
    await db('update', {
      TableName: INVOICES_TABLE,
      Key: {
        companyCustomerId,
        id: invoiceId,
      },
      ConditionExpression: 'locked=:shouldNotBeLocked',
      UpdateExpression: `Set invoiceRows = :invoiceRows, recipients = :recipients`,
      ExpressionAttributeValues: {
        ':shouldNotBeLocked': false,
        ':invoiceRows': newInvoice.invoiceRows,
        ':recipients': newInvoice.recipients,
      },
    });

    return true;
  } catch (error) {
    throw error;
  }
};
