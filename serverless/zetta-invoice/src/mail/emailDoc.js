/* @flow */

/**
 * @date 2018-02
 */

import Invoice from '../invoice/invoice';
import db from '../util/database';
import aws from 'aws-sdk';
import nodemailer from 'nodemailer';
import Template from './prepareTemplate';

export const sendInvoice = async (params: { invoiceId: string }) => {
  const { invoiceId } = params;
  try {
    const invoice = Invoice.get({ db, invoiceId });
    return prepareAndSend({ data: { invoice } });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const prepareAndSend = async (params: {
  data: {
    invoiceId: string,
    recipientId: string,
    discount: number,
    tax: number,
  },
}) => await send(await Template(params.data));

export const send = (contentBuffer: any) => {
  console.log(`Constructing transporter for e-mail.`);
  let transporter = nodemailer.createTransport({
    SES: new aws.SES({
      apiVersion: '2010-12-01',
      region: 'eu-west-1',
    }),
  });

  console.log(`Sending email.`);
  transporter.sendMail(
    {
      from: 'admin@membrum.se',
      to: 'zmk.zk.dev@gmail.com',
      subject: 'Invoice',
      text: 'I hope this message gets sent!',
      attachments: [
        {
          filename: 'invoice.pdf',
          content: contentBuffer,
          contentType: 'application/pdf',
        },
      ],
    },
    (err, info) => {
      if (err) {
        console.error(err);
      }
      console.error(err);
      console.log(info.envelope);
      console.log(info.messageId);
    }
  );
};

export default { prepareAndSend, send };
