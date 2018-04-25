/**
 * @date 2018-03-05
 */
import cuid from 'cuid';
import request from '../../util/http';
import testConfig from '../../util/testConfig';

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

describe.skip('Invoices.', () => {
  afterEach(async () => {
    await request({
      host,
      path: `invoice/lock`,
      payload: {
        method: 'post',
        body: {
          companyCustomerId: 'companyCustomerId',
          invoiceId: 'invoiceId3',
          lock: false,
        },
      },
    });

    await request({
      host,
      path: 'invoice',
      payload: {
        method: 'delete',
        body: {
          companyCustomerId: 'companyCustomerId',
          invoiceId: 'createdId',
        },
      },
    });
  });

  it('Get unlocked.', async () => {
    const expected = [
      {
        companyCustomerId: 'companyCustomerId',
        createdAt: 3456789012,
        id: 'invoiceId1',
        invoiceRows: [{ description: '1an', price: 123, tax: 0.01, unit: 12 }],
        itemStatus: {
          createdAt: 3456789012,
          id: 'itemStatusId1',
          invoiceId: 'invoiceId1',
          itemStatus: 'pending',
        },
        locked: false,
        price: '123',
        recipients: ['recipientId'],
        unit: 'Timmar',
      },
      {
        companyCustomerId: 'companyCustomerId',
        createdAt: 5678901234,
        id: 'invoiceId3',
        invoiceRows: [
          { description: '3an A', price: 345, tax: 0.25, unit: 34 },
          { description: '3an B', price: 345, tax: 0.25, unit: 34 },
          { description: '3an C', price: 345, tax: 0.25, unit: 34 },
        ],
        itemStatus: {
          createdAt: 5678901234,
          id: 'itemStatusId3',
          invoiceId: 'invoiceId3',
          itemStatus: 'canceled',
        },
        locked: false,
        price: '789',
        recipients: ['recipientId'],
        unit: 'Timmar',
      },
      {
        companyCustomerId: 'companyCustomerId',
        createdAt: 3456789012,
        id: 'invoiceToUpdate1',
        invoiceRows: [{ description: 'Aan', price: 123, tax: 0.01, unit: 12 }],
        itemStatus: {
          createdAt: 3456789012,
          id: 'itemStatusId1A',
          invoiceId: 'invoiceId1A',
          itemStatus: 'pending',
        },
        locked: false,
        price: '1234',
        recipients: ['recipientIdA'],
        unit: 'Timmar',
      },
    ];
    const result = await request({
      payload: {
        method: 'get',
      },
      host,
      path: 'invoice/companyCustomerId/false',
    });
    expect(result).toEqual(expected);
  });

  it('Get locked.', async () => {
    const expected = [
      {
        companyCustomer: {
          VAT: 'XX123456789101',
          address: 'Road 123A',
          bank: { giro: '123-4567', name: 'MoneyBank' },
          city: 'City',
          company: 'Company AB',
          createdAt: 1234567890,
          defaultTax: 0.25,
          email: 'firstName@company.com',
          firstName: 'FirstName',
          id: 'companyCustomerId',
          lastName: 'LastName',
          mobile: '+46761234567',
          zipcode: '12345',
        },
        companyCustomerId: 'companyCustomerId',
        createdAt: 4567890123,
        id: 'invoiceId2',
        invoiceRows: [
          { description: '2an A', price: 234, tax: 0.02, unit: 23 },
          { description: '2an B', price: 234, tax: 0.02, unit: 23 },
        ],
        itemStatus: {
          createdAt: 4567890123,
          id: 'itemStatusId2',
          invoiceId: 'invoiceId2',
          itemStatus: 'succeeded',
        },
        locked: true,
        price: '456',
        recipients: ['recipientId'],
        unit: 'Timmar',
      },
    ];
    const result = await request({
      payload: {
        method: 'get',
      },
      host,
      path: 'invoice/companyCustomerId/true',
    });
    expect(result).toEqual(expected);
  });

  it('Create.', async () => {
    const expectedBefore = [
      {
        companyCustomerId: 'companyCustomerId',
        createdAt: 3456789012,
        id: 'invoiceId1',
        invoiceRows: [{ description: '1an', price: 123, tax: 0.01, unit: 12 }],
        itemStatus: {
          createdAt: 3456789012,
          id: 'itemStatusId1',
          invoiceId: 'invoiceId1',
          itemStatus: 'pending',
        },
        locked: false,
        price: '123',
        recipients: ['recipientId'],
        unit: 'Timmar',
      },
      {
        companyCustomerId: 'companyCustomerId',
        createdAt: 5678901234,
        id: 'invoiceId3',
        invoiceRows: [
          { description: '3an A', price: 345, tax: 0.25, unit: 34 },
          { description: '3an B', price: 345, tax: 0.25, unit: 34 },
          { description: '3an C', price: 345, tax: 0.25, unit: 34 },
        ],
        itemStatus: {
          createdAt: 5678901234,
          id: 'itemStatusId3',
          invoiceId: 'invoiceId3',
          itemStatus: 'canceled',
        },
        locked: false,
        price: '789',
        recipients: ['recipientId'],
        unit: 'Timmar',
      },
      {
        companyCustomerId: 'companyCustomerId',
        createdAt: 3456789012,
        id: 'invoiceToUpdate1',
        invoiceRows: [{ description: 'Aan', price: 123, tax: 0.01, unit: 12 }],
        itemStatus: {
          createdAt: 3456789012,
          id: 'itemStatusId1A',
          invoiceId: 'invoiceId1A',
          itemStatus: 'pending',
        },
        locked: false,
        price: '1234',
        recipients: ['recipientIdA'],
        unit: 'Timmar',
      },
    ];

    expect(
      await request({
        payload: {
          method: 'get',
        },
        host,
        path: 'invoice/companyCustomerId/false',
      })
    ).toEqual(expectedBefore);

    const result = await request({
      host,
      path: `invoice`,
      payload: {
        method: 'post',
        body: {
          companyCustomerId: 'companyCustomerId',
          invoiceId: 'createdId',
          invoiceRows: [
            { description: '3an A', unit: 34, price: 345, tax: 0.25 },
            { description: '3an B', unit: 34, price: 345, tax: 0.25 },
            { description: '3an C', unit: 34, price: 345, tax: 0.25 },
          ],
          recipientIds: ['recipientId1'],
        },
      },
    });

    expect(result.companyCustomerId).toEqual('companyCustomerId');
    expect(result.invoiceRows).toEqual([
      { description: '3an A', unit: 34, price: 345, tax: 0.25 },
      { description: '3an B', unit: 34, price: 345, tax: 0.25 },
      { description: '3an C', unit: 34, price: 345, tax: 0.25 },
    ]);
    expect(result.id).toEqual('createdId');
    expect(result).toHaveProperty('createdAt');
    expect(result.locked).toEqual(false);
    expect(result.recipients).toEqual(['recipientId1']);

    const status = result.itemStatus;
    expect(status).toHaveProperty('createdAt');
    expect(status).toHaveProperty('id');
    expect(status.invoiceId).toEqual('createdId');
    expect(status.itemStatus).toEqual('pending');

    const after = await request({
      payload: {
        method: 'get',
      },
      host,
      path: 'invoice/companyCustomerId/false',
    });

    expect(after.length).toBe(expectedBefore.length + 1);
    const newInvoice = after.find(invoice => {
      return invoice.id === 'createdId';
    });

    expect(newInvoice.companyCustomerId).toEqual('companyCustomerId');
    expect(newInvoice.invoiceRows).toEqual([
      { description: '3an A', unit: 34, price: 345, tax: 0.25 },
      { description: '3an B', unit: 34, price: 345, tax: 0.25 },
      { description: '3an C', unit: 34, price: 345, tax: 0.25 },
    ]);
    expect(newInvoice.id).toEqual('createdId');
    expect(newInvoice).toHaveProperty('createdAt');
    expect(newInvoice.locked).toEqual(false);
    expect(newInvoice.recipients).toEqual(['recipientId1']);

    const newStatus = newInvoice.itemStatus;
    expect(newStatus).toHaveProperty('createdAt');
    expect(newStatus).toHaveProperty('id');
    expect(newStatus.invoiceId).toEqual('createdId');
    expect(newStatus.itemStatus).toEqual('pending');
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
});
