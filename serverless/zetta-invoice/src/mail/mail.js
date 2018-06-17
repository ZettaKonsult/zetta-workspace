/* @flow */

/**
 * @date 2018-03-12
 */

import type { LockedInvoice } from 'types/Invoice';
import type { Recipient } from 'types/Recipient';

import attachment from './attachments';
import prepareTemplate from './prepareTemplate';
import mailer from './mailer';

const sendInvoice = async (params: {
  invoice: LockedInvoice,
  discount?: number,
  companyCustomer: CompanyCustomer,
  recipients: Array<Recipient>,
}) => {
  const sendingPromise = params.recipients.map(async recipient => {
    const template = await prepareTemplate({ ...params, recipient });
    const buffer = await attachment.generatePDF({ template });
    return mailer.send({ buffer, email: recipient.email });
  });
  await Promise.all(sendingPromise);

  return true;
};

export { sendInvoice };
