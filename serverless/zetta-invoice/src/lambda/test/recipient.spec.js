/**
 * @date 2018-03-05
 */

import request from '../../util/http';
import testConfig from '../../util/testConfig';

const host = testConfig.Host;

describe('Recipients.', () => {
  const companyCustomerId = 'companyCustomerId';
  let recipient;

  it('Create.', async () => {
    const data = {
      address: 'Road 234A',
      city: 'RecipientCity',
      createdAt: 2345678901,
      email: 'firstName@recipient.com',
      firstName: 'RecipientFirst',
      lastName: 'RecipientLast',
      mobile: '+46762345678',
      ssn: '1234567890',
      zipcode: '12345',
    };

    recipient = await request({
      host,
      path: 'recipient',
      payload: {
        method: 'post',
        body: {
          recipient: data,
          companyCustomerId,
        },
      },
    });

    expect(recipient).toHaveProperty('id');
  });

  it('get', async () => {
    const result = await request({
      host,
      path: `recipient/${companyCustomerId}/${recipient.id}`,
      payload: {
        method: 'get',
      },
    });

    expect(result).toEqual(recipient);
  });

  it('delete', async () => {
    const data = {
      recipientId: recipient.id,
      companyCustomerId,
    };

    const result = await request({
      host,
      path: `recipient/`,
      payload: {
        method: 'delete',
        body: data,
      },
    });

    expect(result).toEqual(data);
  });
});
