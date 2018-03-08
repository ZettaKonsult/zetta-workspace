import aws from 'aws-sdk';
import nodemailer from 'nodemailer';

export default contentBuffer => {
  /*
   * Create Nodemailer SES transporter.
   */
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
      if (err) {
        console.error(err);
      }
      console.log(info.envelope);
      console.log(info.messageId);
    }
  );
};
