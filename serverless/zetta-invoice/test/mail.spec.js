/**
 * @date 2018-03-12
 */

import request from '../src/util/http';
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
            invoiceId: 'invoiceId3',
          },
        },
      })
    ).toEqual({ reference: 5678901234 });
  });
  it('Already paid.', async () => {
    expect(
      await request({
        host,
        path: 'invoice/mail',
        payload: {
          method: 'post',
          body: {
            companyCustomerId: 'companyCustomerId',
            invoiceId: 'invoiceId2',
          },
        },
      })
    ).toEqual('Can not pay with a locked invoice (invoiceId2)!');
  });
  it('Wrong customer.', async () => {
    expect(
      await request({
        host,
        path: 'invoice/mail',
        payload: {
          method: 'post',
          body: {
            companyCustomerId: 'ErrorCustomer',
            invoiceId: 'invoiceId2',
          },
        },
      })
    ).toEqual('No such customer (ErrorCustomer)!');
  });
  it('Wrong invoice.', async () => {
    expect(
      await request({
        host,
        path: 'invoice/mail',
        payload: {
          method: 'post',
          body: {
            companyCustomerId: 'companyCustomerId',
            invoiceId: 'ErrorInvoice',
          },
        },
      })
    ).toEqual('No such invoice (ErrorInvoice)!');
  });
  it('Both wrong.', async () => {
    expect(
      await request({
        host,
        path: 'invoice/mail',
        payload: {
          method: 'post',
          body: {
            companyCustomerId: 'ErrorCustomer',
            invoiceId: 'ErrorInvoice',
          },
        },
      })
    ).toEqual('No such customer (ErrorCustomer)!');
  });
});
