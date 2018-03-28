/**
 * @date 2018-03-05
 */

import request from '../util/http';
import testConfig from '../util/testConfig';
import testData from '../util/testData';

const INVOICES = testData.Invoices;
const host = testConfig.Host;

beforeAll(() => {
  INVOICES.forEach(
    async invoice =>
      await request({
        payload: {
          method: 'post',
          body: invoice,
        },
        host,
        path: 'invoice',
      })
  );
});

afterAll(async () => {
  INVOICES.forEach(async invoice => {
    await request({
      host,
      path: `invoice/${invoice.companyCustomerId}/${invoice.invoiceId}`,
      payload: {
        method: 'delete',
      },
    });
    await request({
      host,
      path: `invoice/status/${invoice.companyCustomerId}/${invoice.invoiceId}`,
      payload: {
        method: 'delete',
      },
    });
  });
});

describe('Lambdas.', () => {
  describe('Invoices.', () => {
    it('Get.', async () => {
      const result = await request({
        payload: {
          method: 'get',
        },
        host,
        path: 'invoice/companyCustomerId',
      });
      expect(result.length).toBe(3);
      expect(result[0].id).toEqual('invoiceId1');
      expect(result[1].id).toEqual('invoiceId2');
      expect(result[2].id).toEqual('invoiceId3');
    });
  });

  describe('InvoiceStatuses.', () => {
    it('Get.', async () => {
      const result = await request({
        payload: {
          method: 'get',
        },
        host,
        path: 'invoice/status/companyCustomerId/invoiceId1',
      });

      expect(result.length).toBe(1);
      result.forEach(res => {
        expect(res.invoiceId).toEqual('invoiceId1');
      });
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
