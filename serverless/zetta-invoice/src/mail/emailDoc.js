/* @flow */

/**
 * @date 2018-02
 */

import aws from 'aws-sdk';
import nodemailer from 'nodemailer';

export default (contentBuffer: any) => {
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
