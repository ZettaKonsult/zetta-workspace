/* @flow */

/**
 * @date 2018-03-12
 */

import type { LockedInvoice } from 'types/Invoice';
import type { Recipient } from 'types/Recipient';
import type { DatabaseMethod } from 'types/Database';
import Customer from '../invoice/customer';
import RecipientManager from '../recipient';
import puppeteer from 'puppeteer';
import emailDoc from './emailDoc';
import prepareTemplate from './prepareTemplate';
import Invoice from '../invoice';

let browser;

export const sendInvoice = async (params: {
  db: DatabaseMethod,
  companyCustomerId: string,
  invoiceId: string,
  discount?: number,
  defaultTax?: number,
}) => {
  const { db, companyCustomerId, invoiceId, discount } = params;
  let { defaultTax } = params;

  const companyCustomer = await Customer.get({ db, companyCustomerId });
  if (companyCustomer == null) {
    throw new Error(`No such customer (${companyCustomerId})!`);
  }

  const invoice = await Invoice.get({ db, companyCustomerId, invoiceId });
  if (invoice == null) {
    throw new Error(`No such invoice (${invoiceId})!`);
  }

  const status = invoice.itemStatus.itemStatus;
  if (status !== 'pending') {
    throw new Error(
      `Can not pay with a non-pending invoice (${invoiceId}, status ${status})!`
    );
  }

  try {
    await Invoice.lock({
      db,
      companyCustomerId,
      invoiceId,
      lock: true,
    });
  } catch (error) {
    throw error;
  }

  const { recipients: recipientIds } = invoice;
  if (recipientIds.length <= 0) {
    throw new Error(`Need at least one recipient id!`);
  }

  const { recipients, missing } = await getRecipients({
    db,
    companyCustomerId,
    recipientIds,
  });

  if (missing.length > 0) {
    throw new Error(
      `Recipients referenced in invoice ${invoiceId} were missing in the Recipients Table!: ${missing.toString()}`
    );
  }
  if (recipients.length <= 0) {
    throw new Error(`Need at least one recipient!`);
  }

  if (defaultTax == null) {
    defaultTax = companyCustomer.defaultTax;
  }

  let err = { message: 'Unknown error.' };
  try {
    await send({ invoice, companyCustomer, recipients, discount, defaultTax });
    return {
      reference: invoice.createdAt,
    };
  } catch (error) {
    err = error;
  }
  const msg = err.message;

  try {
    console.log(`Mailing failed, re-locking invoice.`);
    await Invoice.lock({ db, companyCustomerId, invoiceId, lock: false });
  } catch (error) {
    throw new Error(
      `Could not unlock invoice after failed send: ${error.message}.` +
        `\nMail send failure: ${msg}.`
    );
  }
  throw err;
};

const getBrowserPage = async (): any => {
  console.log(`Constructing browser page.`);
  browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log(`Constructed browser page.`);
  return page;
};

export const send = async (params: {
  invoice: LockedInvoice,
  discount?: number,
  defaultTax: number,
  companyCustomer: CompanyCustomer,
  recipients: Array<Recipient>,
}) => {
  const { companyCustomer, recipients } = params;
  console.log(`Sending mail to recipients: ${recipients.toString()}.`);

  try {
    await recipients.forEach(async recipient => {
      const { email } = recipient;
      console.log(`Sending email to ${email}.`);

      const page = await getBrowserPage();
      console.log(`Constructed page`);
      const renderedTemplate = await prepareTemplate({
        ...params,
        companyCustomer,
        recipient,
      });
      console.log(`Constructed template.`);
      await page.setContent(renderedTemplate);
      console.log(`Set page content.`);
      const buffer = await page.pdf({ format: 'A4' });
      console.log(`Translated content to PDF buffer.`);
      await emailDoc.send({ buffer, email });
    });
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    if (browser) {
      browser.close();
    }
  }
};

const getRecipients = async (params: {
  db: DatabaseMethod,
  companyCustomerId: string,
  recipientIds: Array<string>,
}): Promise<{ recipients: Array<Recipient>, missing: Array<string> }> => {
  const { db, recipientIds, companyCustomerId } = params;
  const result = { missing: [], recipients: [] };

  return recipientIds.reduce(async (result, recipientId) => {
    const recipient = await RecipientManager.get({
      db,
      companyCustomerId,
      recipientId,
    });

    if (recipient == null) {
      console.log(`${recipientId} was missing.`);
      result.missing.push(recipientId);
    } else {
      console.log(`${recipientId} existed.`);
      result.recipients.push(recipient);
    }

    return result;
  }, result);
};

export default { send, sendInvoice };
