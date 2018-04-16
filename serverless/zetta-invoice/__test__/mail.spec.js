/**
 * @date 2018-03-12
 */

import request from '../src/util/http';
import testConfig from '../src/util/testConfig';

const host = testConfig.Host;

afterEach(async () => {
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
  it('Send.', async () => {
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
    expect(result).toEqual({ reference: 3456789012 });
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
    ).toEqual(
      'Could not send invoice mail: Can not pay with a non-pending invoice (invoiceId2, status succeeded)!'
    );
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
    ).toEqual('Could not send invoice mail: No such customer (ErrorCustomer)!');
  });
});
