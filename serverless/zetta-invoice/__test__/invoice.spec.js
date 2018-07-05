/**
 * @date 2018-03-05
 */
import { request, testConfig } from '../src/util/';

const host = testConfig.Host;

describe('Invoices', () => {
  let companyCustomer = {};
  let invoice = {};
  let recipient = {};

  it('create companyCustomer', async () => {
    companyCustomer = {
      address: 'testRoad 33',
      city: 'testCity',
      email: 'test@test.test',
      firstName: 'Test',
      lastName: 'TestPersson',
      mobile: '+46762345678',
      ssn: '1234567890',
      zipcode: '12345',
      company: 'zetta konsult',
      VAT: '91050400356',
      bank: {
        giro: '123-4567',
        name: 'MoneyBank',
      },
    };

    companyCustomer = await request({
      host,
      path: 'companycustomer',
      payload: {
        method: 'post',
        body: { companyCustomer },
      },
    });

    expect({ ...companyCustomer }).toMatchSnapshot({
      id: expect.any(String),
    });
  });

  it('create a recipient', async () => {
    const data = {
      companyCustomerId: companyCustomer.id,
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
      companyCustomerId: expect.any(String),
    });
  });

  it('invoices have correct attributes after creation', async () => {
    invoice = {
      companyCustomerId: companyCustomer.id,
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
      companyCustomerId: expect.any(String),
      createdAt: expect.any(Number),
      recipientIds: [expect.any(String)],
    });
  });

  it('invoice can be sent to recipient', async () => {
    invoice = await request({
      host,
      path: 'invoice/mail',
      payload: {
        method: 'post',
        body: {
          companyCustomerId: companyCustomer.id,
          invoiceId: invoice.id,
        },
      },
    });

    expect({ ...invoice }).toMatchSnapshot({
      id: expect.any(String),
      companyCustomerId: expect.any(String),
      createdAt: expect.any(Number),
      itemStatus: expect.any(Array),
      recipientIds: [expect.any(String)],
    });
  });
});
