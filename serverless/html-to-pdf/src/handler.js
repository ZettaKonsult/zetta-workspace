import aws from 'aws-sdk';
import nodemailer from 'nodemailer';
import parser from 'serverless-event-parser';
import pdf from 'html-pdf';
import { promisify } from 'util';
import fs from 'fs';
import response from './response';

const readFileAsync = promisify(fs.readFile);
const options = { format: 'Letter' };

export const createCompanyCustomer = async (event, context, callback) => {
  let statusCode = 200;
  const { data } = parser(event);

  const html = await fs.readFileAsync('./src/template.html', 'utf8');
  pdf.create(html, options).toBuffer((err, buffer) => {
    if (err) {
      console.log("you con't know what you are doing");
    } else {
      sendMail(buffer);
      callback(null, response(statusCode, {}));
    }
  });
};

const sendMail = contentBuffer => {
  // create Nodemailer SES transporter
  let transporter = nodemailer.createTransport({
    SES: new aws.SES({
      apiVersion: '2010-12-01',
      region: 'eu-west-1',
    }),
  });

  transporter.sendMail(
    {
      from: 'membrum@membrum.se',
      to: 'fiddep@telia.com',
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
      console.log(info.envelope);
      console.log(info.messageId);
    }
  );
};
