/* @flow */

/**
 * @date 2018-03-05
 */

import config from '../util/config';
import awsMock from '../../test/mocks/aws';
import fetch from 'isomorphic-fetch';

import Customer from './customer';
import Invoice from './invoice';
import Recipient from './recipient';

if (!process.env.IS_OFFLINE) {
  throw new Error(
    'Database mode must be set to offline in order to run lambda tests.'
  );
}

const PORT = config.port;
const HOST = `http://localhost:${PORT}`;

export const getRequest = async (params: { path: string }): any => {
  return await fetch(`${HOST}/${params.path}`);
};

describe('Lambdas.', () => {
  describe('CompanyCustomers.', () => {
    it('Get.', async () => {
      const expected = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Content-Type': 'application/json',
        },
        body:
          '{"zipcode":"12345","firstName":"FirstName","lastName":"LastName",' +
          '"createdAt":1234567890,"bank":{"name":"MoneyBank","giro":' +
          '"123-4567"},"address":"Road 123A","city":"City","mobile":' +
          '"+46761234567","VAT":"XX123456789101","company":"Company AB"' +
          ',"id":"companyCustomerId","email":"firstName@company.com"}',
      };
      const value = await awsMock.lambdaCall({
        method: Customer.get,
        body: { companyCustomerId: 'companyCustomerId' },
      });
      expect(value).toEqual(expected);
    });
  });

  describe('Invoices.', () => {
    it('Get.', async () => {
      const expected = {
        body:
          '[{"createdAt":3456789012,"price":"123","itemStatus":{"createdAt":3456789012,"invoiceId":"invoiceId1","id":"itemStatusId1","itemStatus":"pending"},"recipient":"recipientId","companyCustomer":"companyCustomerId","id":"invoiceId1","locked":false},{"createdAt":5678901234,"price":"789","itemStatus":{"createdAt":5678901234,"invoiceId":"invoiceId3","id":"itemStatusId3","itemStatus":"canceled"},"recipient":"recipientId","companyCustomer":"companyCustomerId","id":"invoiceId3","locked":true},{"createdAt":4567890123,"price":"456","itemStatus":{"createdAt":4567890123,"invoiceId":"invoiceId2","id":"itemStatusId2","itemStatus":"succeeded"},"recipient":"recipientId","companyCustomer":"companyCustomerId","id":"invoiceId2","locked":true}]',
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        statusCode: 200,
      };
      const value = await awsMock.lambdaCall({
        method: Invoice.get,
        body: {
          companyCustomerId: 'companyCustomerId',
        },
      });
      expect(value).toEqual(expected);
    });
    it('Send.', async () => {});
    it('Write.', async () => {});
  });

  describe('InvoiceStatuses.', () => {
    it('Get.', async () => {
      const expected = {
        createdAt: 3456789012,
        invoiceId: 'invoiceId1',
        id: 'itemStatusId1',
        itemStatus: 'pending',
      };
      const value = await awsMock.lambdaCall({
        method: Invoice.getStatus,
        body: { invoiceId: 'invoiceId1' },
      });
      expect(value).toEqual(expected);
    });
  });

  describe('Recipients.', () => {
    it('Get.', async () => {
      const expected = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Content-Type': 'application/json',
        },
        body:
          '[{"zipcode":"12345","firstName":"RecipientFirst","lastName":"RecipientLast","createdAt":2345678901,"address":"Road 2' +
          '34A","city":"RecipientCity","mobile":"+46762345678","companyCustomer":"companyCustomerId","id":"recipientId","email":"firstName@r' +
          'ecipient.com","ssn":"1234567890"}]',
      };
      const value = await awsMock.lambdaCall({
        method: Recipient.get,
        body: {
          companyCustomerId: 'companyCustomerId',
        },
      });
      expect(value).toEqual(expected);
    });
  });
});
