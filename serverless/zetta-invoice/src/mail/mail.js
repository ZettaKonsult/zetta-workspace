/* @flow */

/**
 * @date 2018-03-12
 */

import RecipientManager from '../recipient';
import puppeteer from 'puppeteer';
import db from '../util/database';
import emailDoc from './emailDoc';
import prepareTemplate from './prepareTemplate';

import CompanyCustomer from '../invoice/customer';
import Invoice from '../invoice';

let browser;

export const sendInvoice = async (params: {
  companyCustomerId: string,
  invoiceId: string,
  discount: number,
  tax: number,
}) => {
  const { companyCustomerId, invoiceId, discount, tax } = params;

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

  console.log(`Fetched invoice ${invoice.id}.`);
  console.log(`Fetched customer ${companyCustomer.id}.`);
  const recipient = await RecipientManager.get({
    db,
    companyCustomerId,
    recipientId: invoice.recipient,
  });

  if (recipient == null) {
    throw new Error(`No such recipient (${invoice.recipient})!`);
  }
  console.log(`Fetched recipient ${recipient.id}.`);

  await send({ invoice, recipient, discount, tax });
  return {
    reference: invoice.createdAt,
  };
};

const getBrowserPage = async (): any => {
  browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log(`Fetched browser page.`);
  return page;
};

export const send = async (params: any) => {
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
    browser.close();
  }
};

export default { send, sendInvoice };
