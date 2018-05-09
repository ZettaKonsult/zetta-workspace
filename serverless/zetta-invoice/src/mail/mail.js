/* @flow */

/**
 * @date 2018-03-12
 */

import type { LockedInvoice } from 'types/Invoice';
import type { Recipient } from 'types/Recipient';
import type { DatabaseMethod } from 'types/Database';

import Customer from '../companyCustomer/';
import RecipientManager from '../recipient';
import Invoice from '../invoice';

import attachment from './attachments';
import prepareTemplate from './prepareTemplate';
import mailer from './mailer';

const sendInvoice = async (params: {
  db: DatabaseMethod,
  companyCustomerId: string,
  invoiceId: string,
  discount?: number,
  defaultTax?: number,
}) => {
  const { db, companyCustomerId, invoiceId, discount } = params;

  const [companyCustomer, invoice] = await Promise.all([
    Customer.get({ db, companyCustomerId }),
    Invoice.get({ db, companyCustomerId, invoiceId }),
  ]);

  const status = invoice.itemStatus.itemStatus;
  if (status !== 'pending') {
    throw new Error(
      `Can not pay with a non-pending invoice (${invoiceId}, status ${status})!`
    );
  }

  const { recipients: recipientIds } = invoice;
  if (recipientIds.length <= 0) {
    throw new Error(`Need at least one recipient id!`);
  }

  const { recipients, missing } = await RecipientManager.getAll({
    db,
    companyCustomerId,
    recipientIds,
  });

  if (missing.length > 0) {
    throw new Error(
      `Recipients referenced in invoice ${invoiceId} were missing in the Recipients Table!: ${missing.toString()}`
    );
  } else if (recipients.length <= 0) {
    throw new Error(`Need at least one recipient!`);
  }

  const defaultTax =
    params.defaultTax === undefined
      ? companyCustomer.defaultTax
      : params.defaultTax;

  try {
    await send({ invoice, companyCustomer, recipients, discount, defaultTax });
    await Invoice.lock({
      db,
      companyCustomerId,
      invoiceId,
      lock: true,
    });
    return {
      reference: invoice.createdAt,
    };
  } catch (error) {
    try {
      console.log(`Mailing failed, re-locking invoice.`);
      await Invoice.lock({ db, companyCustomerId, invoiceId, lock: false });
    } catch (error) {
      throw new Error(
        `Could not unlock invoice after failed send: ${error.message}.` +
          `\nMail send failure: ${error.message}.`
      );
    }
  }
};

const send = async (params: {
  invoice: LockedInvoice,
  discount?: number,
  defaultTax: number,
  companyCustomer: CompanyCustomer,
  recipients: Array<Recipient>,
}) => {
  const { companyCustomer, recipients } = params;
  console.log(`Sending mail to recipients: ${recipients.toString()}.`);

  const sendingPromise = recipients.map(async recipient => {
    const { email } = recipient;
    console.log(`Sending email to ${email}.`);

    const renderedTemplate = await prepareTemplate({
      ...params,
      companyCustomer,
      recipient,
    });

    const buffer = await attachment.generatePDF({
      template: renderedTemplate,
    });
    console.log(`Translated content to PDF buffer.`);
    await mailer.send({ buffer, email });
  });
  await Promise.all(sendingPromise);

  return true;
};

export { sendInvoice };
