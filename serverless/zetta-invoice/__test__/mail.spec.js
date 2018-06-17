/**
 * @date 2018-03-12
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
        companyCustomerId: 'companyCustomerIdA',
        invoiceId: 'invoiceId1A',
        lock: false,
      },
    },
  });
});

describe('Mail.', () => {
  it.skip('Send.', async () => {
    const result = await request({
      host,
      path: 'invoice/mail',
      payload: {
        method: 'post',
        body: {
          companyCustomerId: 'companyCustomerIdA',
          invoiceId: 'invoiceId1A',
        },
      },
    });
    expect(result).toBeTruthy();
  });
});
