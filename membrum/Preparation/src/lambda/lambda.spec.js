/**
 * @date 2018-03-05
 */

import request from '../util/http';

describe('Lambdas.', () => {
  it('Get assignments.', async () => {
    const expected = {
      created: {
        '9001011111': {
          address: 'Road 1234A',
          city: 'Recipient1City',
          companyCustomer: 'companyCustomerId',
          createdAt: 2345678901,
          email: 'firstName2@recipient.com',
          firstName: 'Recipient1First',
          id: '1234567890',
          lastName: 'Recipient1Last',
          mobile: '+46762345678',
          nation: 'Undefined Nation',
          ssn: '9001011111',
          unionName: 'Samhällsvetarkåren',
          zipcode: '12345',
        },
        '9001012222': {
          attributes: {
            birthdate: '9001012222',
            family_name: 'Två',
            given_name: 'Namn',
          },
          credits: { HT: '24,5', SAM: '34,5' },
          nation: 'Undefined Nation',
          ssn: '9001012222',
          unionName: 'Samhällsvetarkåren',
        },
        '9001013333': {
          attributes: {
            birthdate: '9001013333',
            family_name: '3',
            given_name: 'Namn',
          },
          credits: { EHL: '56,5' },
          nation: 'Undefined Nation',
          ssn: '9001013333',
          unionName: 'Lunda Ekonomerna',
        },
        '9001014444': {
          address: 'Road 2345B',
          city: 'RecipientCity',
          companyCustomer: 'companyCustomerId',
          createdAt: 3456789012,
          email: 'firstName2@recipient.com',
          firstName: 'Recipient2First',
          id: '2345678901',
          lastName: 'Recipient2Last',
          mobile: '+46763456789',
          nation: 'Undefined Nation',
          ssn: '9001014444',
          unionName: 'Studentkåren vid Konstnärliga fakulteten i Malmö',
          zipcode: '23456',
        },
      },
      modified: {},
      same: {},
    };
    const result = await request({ path: 'assignments/get' });
    expect(result).toEqual(expected);
  });
});
