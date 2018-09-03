/**
 * @date 2018-03-05
 */
import { request, testConfig } from '../src/util/';

const host = testConfig.Host;

describe('Invoices', () => {
  let invoice = {};
  let recipient = {};
  let invoiceGroup = {};

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

  it('create a group', async () => {
    const data = {
      name: 'testGroup',
      value: 100,
    };

    invoiceGroup = await request({
      host,
      path: 'invoice/group',
      payload: {
        method: 'post',
        body: data,
      },
    });

    expect({ ...invoiceGroup }).toMatchSnapshot({
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

  it('invoice can be locked on a specific group', async () => {
    const data = { invoiceId: invoice.id, invoiceGroupId: invoiceGroup.id };

    const result = await request({
      host,
      path: `invoice/lock`,
      payload: {
        method: 'put',
        body: data,
      },
    });

    expect(result).toMatchSnapshot({
      id: expect.any(String),
      createdAt: expect.any(Number),
      recipientIds: [expect.any(String)],
      itemStatus: [expect.any(Object)],
    });
  });

  it('delete group', async () => {
    const data = { id: invoiceGroup.id };

    const result = await request({
      host,
      path: 'invoice/group',
      payload: {
        method: 'delete',
        body: data,
      },
    });

    expect(result).toBeTruthy();
  });
});
