/**
 * @date 2018-03-12
 */

import request from '../src/util/http';
import testConfig from '../src/util/testConfig';

const host = testConfig.Host;

describe('Mail.', () => {
  it('Send.', async () => {
    const result = await request({
      host,
      path: 'invoice/mail',
      payload: {
        method: 'post',
        body: {
          companyCustomerId: 'companyCustomerId',
          invoiceId: 'invoiceId3',
        },
      },
    });
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
    });
    expect(result).toEqual({ reference: 5678901234 });
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
    ).toEqual('Could not send invoice mail: invoice is locked (invoiceId2)!');
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
    ).toEqual('Could not send invoice mail: No such customer (ErrorCustomer)!');
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
    ).toEqual('Could not send invoice mail: No such invoice (ErrorInvoice)!');
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
    ).toEqual(
      'Could not send invoice mail: No such customer (ErrorCustomer)!.'
    );
  });
});
