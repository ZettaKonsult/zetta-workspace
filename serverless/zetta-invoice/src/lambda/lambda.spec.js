/**
 * @date 2018-03-05
 */

import request from '../util/http';
import testConfig from '../util/testConfig';

const host = testConfig.Host;

describe('Lambdas.', () => {
  describe('Invoices.', () => {
    it('Get.', async () => {
      const expected = [
        {
          companyCustomer: 'companyCustomerId',
          createdAt: 3456789012,
          id: 'invoiceId1',
          invoiceRows: [
            { description: '1an', hours: 12, price: 123, tax: 0.01 },
          ],
          itemStatus: {
            createdAt: 3456789012,
            id: 'itemStatusId1',
            invoiceId: 'invoiceId1',
            itemStatus: 'pending',
          },
          locked: false,
          price: '123',
          recipient: 'recipientId',
          unit: 'Timmar',
        },
        {
          companyCustomer: 'companyCustomerId',
          createdAt: 4567890123,
          id: 'invoiceId2',
          invoiceRows: [
            {
              description: '2an A',
              hours: 23,
              price: 234,
              tax: 0.02,
            },
            { description: '2an B', hours: 23, price: 234, tax: 0.02 },
          ],
          itemStatus: {
            createdAt: 4567890123,
            id: 'itemStatusId2',
            invoiceId: 'invoiceId2',
            itemStatus: 'succeeded',
          },
          locked: true,
          price: '456',
          recipient: 'recipientId',
          unit: 'Timmar',
        },
        {
          companyCustomer: 'companyCustomerId',
          createdAt: 5678901234,
          id: 'invoiceId3',
          invoiceRows: [
            { description: '3an A', hours: 34, price: 345, tax: 0.25 },
            { description: '3an B', hours: 34, price: 345, tax: 0.25 },
            { description: '3an C', hours: 34, price: 345, tax: 0.25 },
          ],
          itemStatus: {
            createdAt: 5678901234,
            id: 'itemStatusId3',
            invoiceId: 'invoiceId3',
            itemStatus: 'canceled',
          },
          locked: false,
          price: '789',
          recipient: 'recipientId',
          unit: 'Timmar',
        },
      ];
      const result = await request({
        payload: {
          method: 'get',
        },
        host,
        path: 'invoice/companyCustomerId',
      });
      expect(result).toEqual(expected);
    });
  });

  describe('InvoiceStatuses.', () => {
    it('Get.', async () => {
      const expected = [
        {
          createdAt: 3456789012,
          id: 'itemStatusId1',
          invoiceId: 'invoiceId1',
          itemStatus: 'pending',
        },
        {
          createdAt: 6789012345,
          id: 'itemStatusId2',
          invoiceId: 'invoiceId1',
          itemStatus: 'succeeded',
        },
      ];
      const result = await request({
        payload: {
          method: 'get',
        },
        host,
        path: 'invoice/status/get/companyCustomerId/invoiceId1',
      });
      expect(result).toEqual(expected);
    });
  });

  describe('Recipients.', () => {
    it('Get.', async () => {
      const expected = [
        {
          address: 'Road 234A',
          city: 'RecipientCity',
          companyCustomerId: 'companyCustomerId',
          createdAt: 2345678901,
          email: 'firstName@recipient.com',
          firstName: 'RecipientFirst',
          id: 'recipientId',
          lastName: 'RecipientLast',
          mobile: '+46762345678',
          ssn: '1234567890',
          zipcode: '12345',
        },
      ];
      const result = await request({
        host,
        path: 'recipient/companyCustomerId',
        payload: {
          method: 'get',
        },
      });
      expect(result).toEqual(expected);
    });
  });
});
