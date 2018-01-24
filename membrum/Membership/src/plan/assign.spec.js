/* @flow */

/**
 * @date 2018-01-16
 */

import { getSubscriptions } from './assign';

describe('Assign tests.', () => {
  it('Get subscriptions.', () => {
    expect(
      getSubscriptions({
        users: {
          ssn1: {
            ssn: 'ssn1',
            email: 'email1@domain1.com',
            credits: {
              LTH: '3.0',
              USV: '2.0',
            },
            unionName: 'Teknologkåren',
          },
          ssn2: {
            ssn: 'ssn2',
            email: 'email2@domain1.com',
            credits: {
              HT: '3.0',
              EHL: '4.0',
            },
            unionName: 'Lunda Ekonomerna',
          },
        },
      })
    ).toEqual({
      ssn1: ['af', 'trf', 'un', 'tek'],
      ssn2: ['af', 'trf', 'un', 'le'],
    });
  });
});
