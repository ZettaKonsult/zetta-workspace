/**
 * @date 2018-03-28
 */

export default {
  Invoices: [
    {
      invoiceId: 'invoiceId1',
      companyCustomerId: 'companyCustomerId',
      price: '123',
      recipientIds: ['recipientId'],
      createdAt: 3456789012,
      unit: 'Timmar',
      invoiceRows: [
        {
          price: 123,
          hours: 12,
          tax: 0.01,
          description: '1an',
        },
      ],
      itemStatus: {
        id: 'itemStatusId1',
        invoiceId: 'invoiceId1',
        createdAt: 3456789012,
        itemStatus: 'pending',
      },
      locked: false,
    },
    {
      invoiceId: 'invoiceId2',
      companyCustomerId: 'companyCustomerId',
      price: '456',
      recipientIds: ['recipientId'],
      createdAt: 4567890123,
      unit: 'Timmar',
      invoiceRows: [
        {
          price: 234,
          hours: 23,
          tax: 0.02,
          description: '2an A',
        },
        {
          price: 234,
          hours: 23,
          tax: 0.02,
          description: '2an B',
        },
      ],
      itemStatus: {
        id: 'itemStatusId2',
        invoiceId: 'invoiceId2',
        createdAt: 4567890123,
        itemStatus: 'succeeded',
      },
      locked: true,
    },
    {
      invoiceId: 'invoiceId3',
      companyCustomerId: 'companyCustomerId',
      price: '789',
      recipientIds: ['recipientId'],
      createdAt: 5678901234,
      unit: 'Timmar',
      invoiceRows: [
        {
          price: 345,
          hours: 34,
          tax: 0.25,
          description: '3an A',
        },
        {
          price: 345,
          hours: 34,
          tax: 0.25,
          description: '3an B',
        },
        {
          price: 345,
          hours: 34,
          tax: 0.25,
          description: '3an C',
        },
      ],
      itemStatus: {
        id: 'itemStatusId3',
        invoiceId: 'invoiceId3',
        createdAt: 5678901234,
        itemStatus: 'canceled',
      },
      locked: false,
    },
  ],
  DibsInvoices: [
    {
      invoiceId: 'dibsInvoice1',
      companyCustomerId: 'companyCustomerId',
      price: '123',
      recipientIds: ['recipientId'],
      createdAt: 3456789012,
      unit: 'Timmar',
      invoiceRows: [
        {
          price: 123,
          hours: 12,
          tax: 0.01,
          description: '1an',
        },
      ],
      itemStatus: {
        id: 'itemStatusId1',
        invoiceId: 'invoiceId1',
        createdAt: 3456789012,
        itemStatus: 'pending',
      },
      locked: false,
    },
  ],
};
