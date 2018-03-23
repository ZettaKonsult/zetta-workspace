/* @flow */

/**
 * @date 2018-02
 */

import ses from '../util/ses';
import nodemailer from 'nodemailer';

const ERROR_MESSAGES = {
  'Email address is not verified. The following identities failed the check in region ':
    'Unverified e-mail address.',
};

const isError = (params: { message: string }) => {
  Object.keys(ERROR_MESSAGES).forEach((base: string) => {
    if (base.startsWith(params.message)) {
      return ERROR_MESSAGES[base];
    }
  });
  return false;
};

export const send = (contentBuffer: any) => {
  console.log(`Constructing transporter for e-mail.`);
  let transporter = nodemailer.createTransport({
    SES: ses.get(),
  });
  console.log(`SES instance successfully created.`);

  const email = 'zmk.zk.dev@gmail.com';

  try {
    transporter.sendMail(
      {
        from: 'admin@membrum.se',
        to: email,
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
      (error, info) => {
        if (error) {
          console.log(`ERROR: ${error.message}`);
          const fault = isError({ message: error.message });
          if (fault) {
            console.log(`ERROR: ${fault}`);
            throw new Error(`${fault}`);
          } else {
            console.error(error);
          }
        } else {
          console.log(`Email sent.`);
        }
      }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default { send };
