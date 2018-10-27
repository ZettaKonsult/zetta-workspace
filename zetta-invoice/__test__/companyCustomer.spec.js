/**
 * @date 2018-03-05
 */

import { request, testConfig } from '../src/util/';

const host = testConfig.Host;

describe('companyCustomer E2E', () => {
  let companyCustomer;

  it('create', async () => {
    const data = {
      companyCustomer: {
        address: 'Road 234A',
        city: 'RecipientCity',
        email: 'firstName@recipient.com',
        firstName: 'RecipientFirst',
        lastName: 'RecipientLast',
        mobile: '+46762345678',
        ssn: '1234567890',
        zipcode: '12345',
        company: 'zetta konsult',
        vat: '91050400356',
        bank: {
          giro: '123-4567',
          name: 'MoneyBank',
        },
      },
    };

    companyCustomer = await request({
      host,
      path: 'companycustomer',
      payload: {
        method: 'post',
        body: data,
      },
    });

    expect(companyCustomer).toMatchSnapshot();
  });

  it('get', async () => {
    const result = await request({
      host,
      path: `companycustomer`,
      payload: {
        method: 'get',
      },
    });

    expect(result).toEqual(companyCustomer);
  });

  it('update', async () => {
    const result = await request({
      host,
      path: 'companycustomer',
      payload: {
        method: 'post',
        body: { companyCustomer: { ...companyCustomer, zipcode: '54321' } },
      },
    });

    expect(result).toMatchSnapshot();
  });

  it('delete', async () => {
    const data = {
      companyCustomerId: companyCustomer.id,
    };
    const result = await request({
      host,
      path: `companycustomer`,
      payload: {
        method: 'delete',
        body: data,
      },
    });

    expect(result).toEqual(true);
  });
});
