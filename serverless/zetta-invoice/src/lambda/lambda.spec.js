/**
 * @date 2018-03-05
 */

import request from '../util/http';

describe('Lambdas.', () => {
  describe('Invoices.', () => {
    it('Get.', async () => {
      const expected = [
        {
          companyCustomer: 'companyCustomerId',
          createdAt: 3456789012,
          id: 'invoiceId1',
          itemStatus: {
            createdAt: 3456789012,
            id: 'itemStatusId1',
            invoiceId: 'invoiceId1',
            itemStatus: 'pending',
          },
          locked: false,
          price: '123',
          recipient: 'recipientId',
        },
        {
          companyCustomer: 'companyCustomerId',
          createdAt: 5678901234,
          id: 'invoiceId3',
          itemStatus: {
            createdAt: 5678901234,
            id: 'itemStatusId3',
            invoiceId: 'invoiceId3',
            itemStatus: 'canceled',
          },
          locked: true,
          price: '789',
          recipient: 'recipientId',
        },
        {
          companyCustomer: 'companyCustomerId',
          createdAt: 4567890123,
          id: 'invoiceId2',
          itemStatus: {
            createdAt: 4567890123,
            id: 'itemStatusId2',
            invoiceId: 'invoiceId2',
            itemStatus: 'succeeded',
          },
          locked: true,
          price: '456',
          recipient: 'recipientId',
        },
      ];
      const result = await request({ path: 'invoice/companyCustomerId' });
      expect(result).toEqual(expected);
    });
  });

  describe('InvoiceStatuses.', () => {
    it('Get.', async () => {
      const expected = {
        createdAt: 3456789012,
        id: 'itemStatusId1',
        invoiceId: 'invoiceId1',
        itemStatus: 'pending',
      };
      const result = await request({
        path: 'invoice/status/get/invoiceId1',
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
          companyCustomer: 'companyCustomerId',
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
      const result = await request({ path: 'recipient/companyCustomerId' });
      expect(result).toEqual(expected);
    });
  });
});
