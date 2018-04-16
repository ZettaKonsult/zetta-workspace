/**
 * @date 2018-04-09
 */

import { prepareData } from './prepareTemplate';

describe('Template.', () => {
  it('Prepare data.', () => {
    const expected = {
      companyCustomer: {
        VAT: 'XX123456789101A',
        address: 'Road 123AA',
        bank: { giro: '234-5678', name: 'MoneyBankA' },
        city: 'CityA',
        company: 'Company ABA',
        createdAt: 2345678901,
        defaultTax: 0.2,
        email: 'firstNameA@company.com',
        firstName: 'FirstNameA',
        id: 'companyCustomerIdA',
        lastName: 'LastNameA',
        mobile: '+46761234567A',
        zipcode: '12345A',
      },
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
        invoice: {
          id: 'invoiceId1A',
          companyCustomerId: 'companyCustomerIdA',
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
          price: '1234',
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
          createdAt: 3456789012,
          invoiceRows: [
            {
              price: 123,
              unit: 12,
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
        discount: 0,
        defaultTax: 0.2,
      })
    ).toEqual(expected);
  });
});
