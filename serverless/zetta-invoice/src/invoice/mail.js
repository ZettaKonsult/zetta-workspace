/* @flow */

/**
 * @date 2018-03-05
 */

import type { DatabaseMethod } from 'types/Database';

import { sendInvoice } from '../mail/mail';
import get from './get';
import createInvoice from './invoice';

import Customer from '../companyCustomer/';
import RecipientManager from '../recipient';

export default async (params: {
  db: DatabaseMethod,
  invoiceId: string,
  companyCustomerId: string,
}): Promise<{ reference: string }> => {
  const { db, invoiceId, companyCustomerId } = params;

  let invoiceData = await get({ db, companyCustomerId, invoiceId });

  const [companyCustomer, { recipients }] = await Promise.all([
    Customer.get({ db, companyCustomerId }),
    RecipientManager.getAll({
      db,
      companyCustomerId,
      recipientIds: invoiceData.recipient,
    }),
  ]);

  const invoice = createInvoice({
    invoice: invoiceData,
    defaultTax: companyCustomer.defaultTax,
  });
  return await sendInvoice({
    recipients,
    companyCustomer,
    invoice,
    discount: 0,
  });
};
