/**
 * @date 2018-03-05
 */

import { request, testConfig } from '../src/util/';

const host = testConfig.Host;

afterAll(async () => {
  await request({
    host,
    path: `invoice/lock`,
    payload: {
      method: 'post',
      body: {
        companyCustomerId: 'companyCustomerId',
        invoiceId: 'invoiceId1',
        lock: false,
      },
    },
  });
});

describe('Lambdas.', () => {
  describe('CompanyCustomers.', () => {
    it('Get.', async () => {
      const result = await request({
        host,
        path: 'dibs/url',
        payload: {
          method: 'POST',
          body: {
            accepturl: 'acceptUrl',
            cancelurl: 'cancelUrl',
            companyCustomerId: 'companyCustomerId',
            invoiceId: 'invoiceId1',
            merchant: '90234620',
          },
        },
      });

      expect(result).toMatchSnapshot();
    });
  });
});
