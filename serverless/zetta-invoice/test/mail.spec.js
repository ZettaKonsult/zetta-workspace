/**
 * @date 2018-03-12
 */

import request from '../src/util/http';
import mailTest from './mailTest';
import testConfig from '../src/util/testConfig';

const host = testConfig.Host;

describe('Mail.', () => {
  it('Send.', async () => {
    expect(
      await request({
        host,
        path: 'invoice/mail',
        payload: {
          method: 'post',
          body: {
            companyCustomerId: 'companyCustomerId',
            invoiceId: 'invoiceId1',
          },
        },
      })
    ).toEqual(mailTest.get({ method: 'post', path: [`mail`, `send`] }));
  });
});
