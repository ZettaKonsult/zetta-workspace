/**
 * @date 2018-03-05
 */

import request from '../../util/http';
import testConfig from '../../util/testConfig';

const host = testConfig.Host;

afterEach(async () => {
  await request({
    payload: {
      method: 'put',
      body: {
        companyCustomerId: 'companyCustomerId',
        invoiceId: 'invoiceToUpdate1',
        recipients: ['recipientIdA'],
        invoiceRows: [
          {
            price: 123,
            unit: 12,
            tax: 0.01,
            description: 'Aan',
          },
        ],
      },
    },
    host,
    path: 'invoice/',
  });
});

describe('Update.', () => {
  it('Locked.', async () => {
    expect(
      await request({
        payload: {
          method: 'put',
          body: {
            companyCustomerId: 'companyCustomerId',
            invoiceId: 'invoiceId2',
            invoiceRows: [
              { description: '3an A', price: 345, tax: 0.25, unit: 34 },
              { description: '3an B', price: 345, tax: 0.25, unit: 34 },
              { description: '3an C', price: 345, tax: 0.25, unit: 34 },
            ],
            recipients: ['recipientId'],
          },
        },
        host,
        path: 'invoice/',
      })
    ).toEqual(`Can not update locked invoice invoiceId2!`);
  });

  it('Unlocked', async () => {
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
        invoiceRows: [
          { description: '3an A', price: 345, tax: 0.25, unit: 34 },
          { description: '3an B', price: 345, tax: 0.25, unit: 34 },
          { description: '3an C', price: 345, tax: 0.25, unit: 34 },
        ],
        itemStatus: {
          createdAt: 3456789012,
          id: 'itemStatusId1A',
          invoiceId: 'invoiceId1A',
          itemStatus: 'pending',
        },
        locked: false,
        price: '1234',
        recipients: ['recipientId'],
        unit: 'Timmar',
      },
    ];

    expect(
      await request({
        payload: {
          method: 'put',
          body: {
            companyCustomerId: 'companyCustomerId',
            invoiceId: 'invoiceToUpdate1',
            invoiceRows: [
              { description: '3an A', price: 345, tax: 0.25, unit: 34 },
              { description: '3an B', price: 345, tax: 0.25, unit: 34 },
              { description: '3an C', price: 345, tax: 0.25, unit: 34 },
            ],
            recipients: ['recipientId'],
          },
        },
        host,
        path: 'invoice/',
      })
    ).toEqual(true);

    expect(
      await request({
        payload: {
          method: 'get',
        },
        host,
        path: 'invoice/companyCustomerId/false',
      })
    ).toEqual(expected);
  });

  it('Only invoice rows.', async () => {
    expect(
      await request({
        payload: {
          method: 'put',
          body: {
            companyCustomerId: 'companyCustomerId',
            invoiceId: 'invoiceToUpdate1',
            invoiceRows: [
              { description: '3an A', price: 345, tax: 0.25, unit: 34 },
              { description: '3an B', price: 345, tax: 0.25, unit: 34 },
              { description: '3an C', price: 345, tax: 0.25, unit: 34 },
            ],
          },
        },
        host,
        path: 'invoice/',
      })
    ).toEqual(true);

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
        invoiceRows: [
          { description: '3an A', price: 345, tax: 0.25, unit: 34 },
          { description: '3an B', price: 345, tax: 0.25, unit: 34 },
          { description: '3an C', price: 345, tax: 0.25, unit: 34 },
        ],
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
    ).toEqual(expected);
  });

  it('Only recipients.', async () => {
    expect(
      await request({
        payload: {
          method: 'put',
          body: {
            companyCustomerId: 'companyCustomerId',
            invoiceId: 'invoiceToUpdate1',
            recipients: ['recipientId1', 'recipientId2'],
          },
        },
        host,
        path: 'invoice/',
      })
    ).toEqual(true);

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
        invoiceRows: [
          {
            price: 123,
            unit: 12,
            tax: 0.01,
            description: 'Aan',
          },
        ],
        itemStatus: {
          createdAt: 3456789012,
          id: 'itemStatusId1A',
          invoiceId: 'invoiceId1A',
          itemStatus: 'pending',
        },
        locked: false,
        price: '1234',
        recipients: ['recipientId1', 'recipientId2'],
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
    ).toEqual(expected);
  });

  it('Neither.', async () => {
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

    expect(
      await request({
        payload: {
          method: 'put',
          body: {
            companyCustomerId: 'companyCustomerId',
            invoiceId: 'invoiceToUpdate1',
          },
        },
        host,
        path: 'invoice/',
      })
    ).toEqual(
      'Neither new invoice rows nor new recipients were specified when updating invoice invoiceToUpdate1, customer companyCustomerId.'
    );

    expect(
      await request({
        payload: {
          method: 'get',
        },
        host,
        path: 'invoice/companyCustomerId/false',
      })
    ).toEqual(expected);
  });
});
