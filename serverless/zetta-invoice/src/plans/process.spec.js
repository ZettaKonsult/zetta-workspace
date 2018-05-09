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

    expect(result).toMatchSnapshot();
  });

  it('converts map to invoice', () => {
    const result = mapPlansToRecipients({ plans });

    const invoice = convertToInvoice({ plans, plansToRecipientsMap: result });

    expect(invoice).toMatchSnapshot();
  });
});
