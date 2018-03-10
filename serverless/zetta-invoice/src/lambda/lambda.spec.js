/* @flow */

/**
 * @date 2018-03-05
 */

import type { AWSEvent, AWSContext, AWSCallback } from 'types/AWS';

import config from '../util/config';
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

const awsCall = async (params: {
  body: any,
}): Promise<{
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback,
}> => ({
  event: {
    body: JSON.stringify(params.body),
    Records: {},
    names: [],
    pathParameters: {},
    queryStringParameters: [],
    requestContext: {
      stage: '',
      resourcePath: '',
    },
  },
  context: {},
  callback: () => {},
});

const lambdaCall = async (params: { method: any, body: any }) => {
  const { body, method } = params;
  const aws = await awsCall({ body });

  let x;
  await method(aws.event, aws.context, (error, data) => {
    x = data;
  });
  return x;
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
      const value = await lambdaCall({
        method: Customer.get,
        body: { companyCustomerId: 'companyCustomerId' },
      });
      expect(value).toEqual(expected);
    });
  });

  describe('Invoices.', () => {
    it('Get.', async () => {
      const expected = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Content-Type': 'application/json',
        },
        body:
          '[{"recipient":"recipientId","createdAt":3456789012,"companyCustomer":"companyCustomerId","id":"invoiceId1","locked":' +
          'false,"itemStatus":{"createdAt":3456789012,"invoiceId":"invoiceId1","id":"itemStatusId1","itemStatus":"pending"}},{"recipient":"r' +
          'ecipientId","createdAt":5678901234,"companyCustomer":"companyCustomerId","id":"invoiceId3","locked":true,"itemStatus":{"createdAt' +
          '":5678901234,"invoiceId":"invoiceId3","id":"itemStatusId3","itemStatus":"canceled"}},{"recipient":"recipientId","createdAt":45678' +
          '90123,"companyCustomer":"companyCustomerId","id":"invoiceId2","locked":true,"itemStatus":{"createdAt":4567890123,"invoiceId":"inv' +
          'oiceId2","id":"itemStatusId2","itemStatus":"succeeded"}}]',
      };
      const value = await lambdaCall({
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
      const value = await lambdaCall({
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
      const value = await lambdaCall({
        method: Recipient.get,
        body: {
          companyCustomerId: 'companyCustomerId',
        },
      });
      expect(value).toEqual(expected);
    });
  });
});
