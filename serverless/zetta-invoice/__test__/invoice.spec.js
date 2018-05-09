/**
 * @date 2018-03-05
 */
import cuid from 'cuid';
import { request, testConfig } from '../src/util/';

const host = testConfig.Host;

let companyCustomerId1 = cuid();
let companyCustomerId2 = cuid();
let invoices = [
  {
    companyCustomerId: companyCustomerId1,
    invoiceRows: [
      { description: '3an A', unit: 34, price: 345, tax: 0.25 },
      { description: '3an B', unit: 34, price: 345, tax: 0.25 },
      { description: '3an C', unit: 34, price: 345, tax: 0.25 },
    ],
    recipientIds: ['recipientId1'],
  },
  {
    companyCustomerId: companyCustomerId2,
    invoiceRows: [
      { description: '3an A', unit: 34, price: 345, tax: 0.25 },
      { description: '3an B', unit: 34, price: 345, tax: 0.25 },
      { description: '3an C', unit: 34, price: 345, tax: 0.25 },
    ],
    recipientIds: ['recipientId1'],
  },
];

beforeAll(async () => {
  let invoicesPromise = invoices.map(invoice =>
    request({
      host,
      path: `invoice`,
      payload: {
        method: 'post',
        body: invoice,
      },
    })
  );
  invoices = await Promise.all(invoicesPromise);
});

afterAll(async () => {
  let invoicesPromise = invoices.map(invoice =>
    request({
      host,
      path: 'invoice',
      payload: {
        method: 'delete',
        body: {
          companyCustomerId: invoice.companyCustomerId,
          invoiceId: invoice.id,
        },
      },
    })
  );
  await Promise.all(invoicesPromise);
});

describe('Invoices', () => {
  it('invoices have correct attributes after creation', () => {
    let invoice = invoices[0];

    expect(invoice).toHaveProperty('id');
  });

  it('get unlocked invoices', async () => {
    const result = await request({
      payload: {
        method: 'get',
      },
      host,
      path: `invoice/${companyCustomerId1}/false`,
    });

    expect(result).toEqual([invoices[0]]);
  });

  //TODO this endpoint does not inject companyCustomer on locking yet
  it.skip('lock invoice', async () => {
    const result = await request({
      payload: {
        method: 'post',
        body: {
          companyCustomerId: companyCustomerId2,
          invoiceId: invoices[1].id,
          lock: 'true',
        },
      },
      host,
      path: `invoice/lock`,
    });

    const lockedInvoices = await request({
      payload: {
        method: 'get',
      },
      host,
      path: `invoice/${companyCustomerId2}/true`,
    });

    expect(result).toEqual({ [invoices[1].id]: { locked: true } });
    expect(lockedInvoices[0]).toHaveProperty('companyCustomer');
  });
});

describe('Statuses.', () => {
  it('Get one.', async () => {
    const expected = {
      id: 'itemStatusId1',
      invoiceId: 'invoiceId1',
      createdAt: 3456789012,
      itemStatus: 'pending',
    };
    const result = await request({
      payload: {
        method: 'get',
      },
      host,
      path: 'invoice/status/companyCustomerId/invoiceId1',
    });
    expect(result).toEqual(expected);
  });
  it('Get many.', async () => {
    const expected = [
      {
        id: 'itemStatusId1',
        invoiceId: 'invoiceId1',
        createdAt: 3456789012,
        itemStatus: 'pending',
      },
      {
        id: 'itemStatusId2',
        invoiceId: 'invoiceId1',
        createdAt: 6789012345,
        itemStatus: 'succeeded',
      },
    ];
    const result = await request({
      payload: {
        method: 'get',
      },
      host,
      path: 'invoice/status/invoiceId1',
    });
    expect(result).toEqual(expected);
  });
});
