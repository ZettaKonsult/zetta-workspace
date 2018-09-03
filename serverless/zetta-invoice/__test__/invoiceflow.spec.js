/**
 * @date 2018-03-05
 */
import { request, testConfig } from '../src/util/';

const host = testConfig.Host;

describe('Invoices', () => {
  let invoice = {};
  let recipient = {};

  it('create a recipient', async () => {
    const data = {
      recipient: {
        address: 'Road 234A',
        city: 'RecipientCity',
        createdAt: 2345678901,
        email: 'fiddep@telia.com',
        firstName: 'RecipientFirst',
        lastName: 'RecipientLast',
        mobile: '+46762345678',
        ssn: '1234567890',
        zipcode: '12345',
      },
    };

    recipient = await request({
      host,
      path: 'recipient',
      payload: {
        method: 'post',
        body: data,
      },
    });

    expect({ ...recipient }).toMatchSnapshot({
      id: expect.any(String),
    });
  });

  it('invoices have correct attributes after creation', async () => {
    invoice = {
      invoiceRows: [
        { description: '3an A', unit: 34, price: 345, tax: 0.25 },
        { description: '3an B', unit: 34, price: 345, tax: 0.25 },
        { description: '3an C', unit: 34, price: 345, tax: 0.25 },
      ],
      recipientIds: [recipient.id],
    };

    invoice = await request({
      host,
      path: `invoice`,
      payload: {
        method: 'post',
        body: invoice,
      },
    });

    expect({ ...invoice }).toMatchSnapshot({
      id: expect.any(String),
      createdAt: expect.any(Number),
      recipientIds: [expect.any(String)],
    });
  });
});
