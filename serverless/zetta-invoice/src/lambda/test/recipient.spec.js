/**
 * @date 2018-03-05
 */

import request from '../../util/http';
import testConfig from '../../util/testConfig';

const host = testConfig.Host;

describe('Lambdas.', () => {
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
