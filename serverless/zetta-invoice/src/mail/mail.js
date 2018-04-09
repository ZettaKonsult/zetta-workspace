/* @flow */

/**
 * @date 2018-03-12
 */

import type { DatabaseMethod } from 'types/Database';
import Customer from '../invoice/customer';
import RecipientManager from '../recipient';
import puppeteer from 'puppeteer';
import emailDoc from './emailDoc';
import prepareTemplate from './prepareTemplate';

import CompanyCustomer from '../invoice/customer';
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

  let [companyCustomer, invoice] = await Promise.all([
    CompanyCustomer.get({ db, companyCustomerId }),
    Invoice.get({ db, companyCustomerId, invoiceId }),
  ]);

  if (companyCustomer == null) {
    throw new Error(`No such customer (${companyCustomerId})!`);
  }
  if (invoice == null) {
    throw new Error(`No such invoice (${invoiceId})!`);
  }
  if (invoice.locked) {
    throw new Error(`Can not pay with a locked invoice (${invoiceId})!`);
  }

  try {
    await Invoice.lock({ db, companyCustomerId, invoiceId, lock: true });
  } catch (error) {
    throw error;
  }

  const recipient = await RecipientManager.get({
    db,
    companyCustomerId,
    recipientId: invoice.recipient,
  });

  if (defaultTax == null) {
    defaultTax = (await Customer.get({
      db,
      companyCustomerId,
    })).defaultTax;
  }

  let err = { message: 'Unknown error.' };
  try {
    if (recipient == null) {
      throw new Error(`No such recipient (${invoice.recipient})!`);
    }
    console.log(`Fetched recipient ${recipient.id}.`);

    await send({ invoice, recipient, discount, defaultTax });
    return {
      reference: invoice.createdAt,
    };
  } catch (error) {
    err = error;
  }
  const msg = err.message;

  try {
    Invoice.lock({ db, companyCustomerId, invoiceId, lock: false });
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

export const send = async (params: any) => {
  console.log(`Preparing template`);

  try {
    let [renderedTemplate, page] = await Promise.all([
      prepareTemplate(params),
      getBrowserPage(),
    ]);

    console.log(`Setting page content.`);
    page.setContent(renderedTemplate);

    console.log(`Building PDF buffer.`);
    const buffer = await page.pdf({ format: 'A4' });

    console.log(`Sending buffer.`);
    await emailDoc.send(buffer);
  } catch (error) {
    throw error;
  } finally {
    if (browser) {
      browser.close();
    }
  }
};

export default { send, sendInvoice };
