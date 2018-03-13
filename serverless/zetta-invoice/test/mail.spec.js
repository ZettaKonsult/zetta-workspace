/* @flow */

/**
 * @date 2018-03-12
 */

import Mail from '../src/mail';

if (!process.env.IS_OFFLINE) {
  throw new Error(
    'Database mode must be set to offline in order to run lambda tests.'
  );
}

describe('Mail.', () => {
  it('Send.', async () => {
    await Mail.sendInvoice({
      data: {
        invoiceId: 'invoiceId1',
        recipientId: 'recipientId',
        discount: 1,
        tax: 0.05,
      },
    });
  });
});
