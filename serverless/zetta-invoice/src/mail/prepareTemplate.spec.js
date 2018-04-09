/**
 * @date 2018-04-09
 */

import { prepareData } from './prepareTemplate';

describe('Template.', () => {
  it('Prepare data.', () => {
    const expected = {
      companyCustomer: 'companyCustomerIdA',
      discount: 0,
      invoice: {
        createdAt: '1970-02-10',
        id: 3456789012,
        timeToPay: '1970-02-28',
      },
      invoiceRows: [
        { description: 'Aan', price: 123, tax: 0.01, total: 1476, unit: 12 },
      ],
      netTotal: 1461.24,
      receiver: 'RecipientFirstA',
      recipient: {
        address: 'Road 234A1',
        city: 'RecipientCityA',
        companyCustomerId: 'companyCustomerIdA',
        createdAt: 23456789011,
        email: 'firstNameA@recipient.com',
        firstName: 'RecipientFirstA',
        id: 'recipientIdA',
        lastName: 'RecipientLastA',
        mobile: '+467623456781',
        ssn: '12345678901',
        zipcode: '123451',
      },
      taxTotal: 14.76,
      total: 1476,
    };
    expect(
      prepareData({
        invoice: {
          createdAt: 3456789012,
          unit: 'Timmar',
          price: '1234',
          itemStatus: {
            createdAt: 3456789012,
            invoiceId: 'invoiceId1A',
            id: 'itemStatusId1A',
            itemStatus: 'pending',
          },
          recipient: 'recipientIdA',
          companyCustomer: 'companyCustomerIdA',
          id: 'invoiceId1A',
          invoiceRows: [
            {
              price: 123,
              unit: 12,
              tax: 0.01,
              description: 'Aan',
            },
          ],
          locked: false,
        },
        recipient: {
          zipcode: '123451',
          firstName: 'RecipientFirstA',
          lastName: 'RecipientLastA',
          createdAt: 23456789011,
          address: 'Road 234A1',
          city: 'RecipientCityA',
          mobile: '+467623456781',
          id: 'recipientIdA',
          companyCustomerId: 'companyCustomerIdA',
          email: 'firstNameA@recipient.com',
          ssn: '12345678901',
        },
        discount: 0,
        defaultTax: 0.2,
      })
    ).toEqual(expected);
  });
});
