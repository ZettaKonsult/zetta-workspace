/**
 * @date 2018-04-09
 */

import { prepareData } from './prepareTemplate';

describe('Template.', () => {
  it('Prepare data.', () => {
    const data = {
      companyCustomer: {
        id: 'companyCustomerIdA',
        firstName: 'FirstNameA',
        lastName: 'LastNameA',
        city: 'CityA',
        address: 'Road 123AA',
        mobile: '+46761234567A',
        VAT: 'XX123456789101A',
        zipcode: '12345A',
        company: 'Company ABA',
        email: 'firstNameA@company.com',
        defaultTax: 0.2,
        bank: {
          giro: '234-5678',
          name: 'MoneyBankA',
        },
        createdAt: 2345678901,
      },
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
      invoice: {
        id: 'invoiceId1A',
        companyCustomerId: 'companyCustomerIdA',
        createdAt: 3456789012,
        invoiceRows: [
          {
            price: 123,
            unit: 10,
            tax: 0.01,
            description: 'Aan',
          },
        ],
        itemStatus: {
          id: 'itemStatusId1A',
          invoiceId: 'invoiceId1A',
          createdAt: 3456789012,
          itemStatus: 'pending',
        },
        locked: true,
      },
      discount: 0,
    };

    const result = prepareData(data);

    expect(result).toMatchSnapshot();
  });
});
