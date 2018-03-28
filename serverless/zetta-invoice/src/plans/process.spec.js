import { mapPlansToRecipients, convertToInvoice } from './process';

describe('converts array to map', () => {
  const plans = [
    { id: 'p1', name: 'pTest1', recipientIds: ['r1'], companyCustomerId: 'c1' },
    { id: 'p2', name: 'pTest2', recipientIds: ['r1'], companyCustomerId: 'c1' },
    { id: 'p3', name: 'pTest3', recipientIds: ['r2'], companyCustomerId: 'c1' },
    { id: 'p4', name: 'pTest4', recipientIds: ['r2'], companyCustomerId: 'c2' },
  ];

  it('converts a mapping between customer, recipient and plans', () => {
    const result = mapPlansToRecipients({ plans });

    expect(result).toEqual({
      r1: {
        c1: ['p1', 'p2'],
      },
      r2: {
        c1: ['p3'],
        c2: ['p4'],
      },
    });
  });

  it('converts map to invoice', () => {
    const result = mapPlansToRecipients({ plans });
    const invoice = convertToInvoice({ plans, plansToRecipientsMap: result });

    expect(invoice).toEqual([
      {
        companyCustomerId: 'c1',
        invoiceRows: [
          {
            description: 'pTest1',
            price: 0,
            tax: 0.25,
            unit: 1,
          },
          {
            description: 'pTest2',
            price: 0,
            tax: 0.25,
            unit: 1,
          },
        ],
        recipientId: 'r1',
      },
      {
        companyCustomerId: 'c1',
        invoiceRows: [
          {
            description: 'pTest3',
            price: 0,
            tax: 0.25,
            unit: 1,
          },
        ],
        recipientId: 'r2',
      },
      {
        companyCustomerId: 'c2',
        invoiceRows: [
          {
            description: 'pTest4',
            price: 0,
            tax: 0.25,
            unit: 1,
          },
        ],
        recipientId: 'r2',
      },
    ]);
  });
});
