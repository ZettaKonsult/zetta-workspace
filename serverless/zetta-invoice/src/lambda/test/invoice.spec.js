/**
 * @date 2018-03-05
 */

import request from '../../util/http';
import testConfig from '../../util/testConfig';

const host = testConfig.Host;

afterEach(async () => {
  await request({
    host,
    path: `invoice/lock`,
    payload: {
      method: 'post',
      body: {
        companyCustomerId: 'companyCustomerId',
        invoiceId: 'invoiceId3',
        lock: false,
      },
    },
  });

  await request({
    host,
    path: 'invoice',
    payload: {
      method: 'delete',
      body: {
        companyCustomerId: 'companyCustomerId',
        invoiceId: 'createdId',
      },
    },
  });
});

describe('Lambdas.', () => {
  describe('Invoices.', () => {
    it('Get.', async () => {
      const expected = [
        {
          companyCustomer: 'companyCustomerId',
          createdAt: 3456789012,
          id: 'invoiceId1',
          invoiceRows: [
            { description: '1an', unit: 12, price: 123, tax: 0.01 },
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
              unit: 23,
              price: 234,
              tax: 0.02,
            },
            { description: '2an B', unit: 23, price: 234, tax: 0.02 },
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
            { description: '3an A', unit: 34, price: 345, tax: 0.25 },
            { description: '3an B', unit: 34, price: 345, tax: 0.25 },
            { description: '3an C', unit: 34, price: 345, tax: 0.25 },
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

    it('Create.', async () => {
      expect(
        (await request({
          payload: {
            method: 'get',
          },
          host,
          path: 'invoice/companyCustomerId',
        })).length
      ).toBe(3);

      const result = await request({
        host,
        path: `invoice`,
        payload: {
          method: 'post',
          body: {
            companyCustomerId: 'companyCustomerId',
            invoiceId: 'createdId',
            createdAt: 12345,
            invoiceRows: [
              { description: '3an A', unit: 34, price: 345, tax: 0.25 },
              { description: '3an B', unit: 34, price: 345, tax: 0.25 },
              { description: '3an C', unit: 34, price: 345, tax: 0.25 },
            ],
            recipientIds: ['recipientId1'],
          },
        },
      });

      expect(result.companyCustomer).toEqual('companyCustomerId');
      expect(result.invoiceRows).toEqual([
        { description: '3an A', unit: 34, price: 345, tax: 0.25 },
        { description: '3an B', unit: 34, price: 345, tax: 0.25 },
        { description: '3an C', unit: 34, price: 345, tax: 0.25 },
      ]);
      expect(result.id).toEqual('createdId');
      expect(result.createdAt).toEqual(12345);
      expect(result.locked).toEqual(false);
      expect(result.recipients).toEqual(['recipientId1']);

      const status = result.itemStatus;
      expect(status.createdAt).toEqual(12345);
      expect(status).toHaveProperty('id');
      expect(status.invoiceId).toEqual('createdId');
      expect(status.itemStatus).toEqual('pending');

      expect(
        (await request({
          payload: {
            method: 'get',
          },
          host,
          path: 'invoice/companyCustomerId',
        })).length
      ).toBe(4);
    });
  });

  describe('InvoiceStatuses.', () => {
    it('Get one.', async () => {
      const expected = {
        id: 'itemStatusId1',
        invoiceId: 'invoiceId1',
        createdAt: 3456789012,
        itemStatus: 'pending',
      };
      const result = await request({
        payload: {
          method: 'get',
        },
        host,
        path: 'invoice/status/companyCustomerId/invoiceId1',
      });
      expect(result).toEqual(expected);
    });
    it('Get many.', async () => {
      const expected = [
        {
          id: 'itemStatusId1',
          invoiceId: 'invoiceId1',
          createdAt: 3456789012,
          itemStatus: 'pending',
        },
        {
          id: 'itemStatusId2',
          invoiceId: 'invoiceId1',
          createdAt: 6789012345,
          itemStatus: 'succeeded',
        },
      ];
      const result = await request({
        payload: {
          method: 'get',
        },
        host,
        path: 'invoice/status/invoiceId1',
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
