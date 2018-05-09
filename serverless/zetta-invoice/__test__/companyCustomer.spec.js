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
        VAT: '91050400356',
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

    expect(companyCustomer).toHaveProperty('id');
  });

  it('get', async () => {
    const result = await request({
      host,
      path: `companycustomer/${companyCustomer.id}`,
      payload: {
        method: 'get',
      },
    });

    expect(result).toEqual(companyCustomer);
  });

  it('delete', async () => {
    const data = {
      companyCustomerId: companyCustomer.id,
    };
    const result = await request({
      host,
      path: `companycustomer/`,
      payload: {
        method: 'delete',
        body: data,
      },
    });

    expect(result).toEqual(data);
  });
});
