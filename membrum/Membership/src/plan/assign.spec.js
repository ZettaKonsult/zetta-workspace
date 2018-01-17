/* @flow */

/**
 * @date 2018-01-16
 */

import { getSubscriptions } from './assign'

describe('Assign tests.', () => {
  it('Get subscriptions.', () => {
    expect(
      getSubscriptions({
        users: {
          ssn1: {
            ssn: 'ssn1',
            email: 'email1@domain1.com',
            credits: {
              LTH: 3.0,
              USV: 2.0
            },
            union: 'Teknologkåren'
          },
          ssn2: {
            ssn: 'ssn2',
            email: 'email2@domain1.com',
            credits: {
              HT: 3.0,
              EHL: 4.0
            },
            union: 'Lunda Ekonomerna'
          }
        }
      })
    ).toEqual({
      ssn1: {
        id: 'tek',
        name: 'Teknologkåren',
        amount: '0',
        interval: 'month',
        intervalCount: '6',
        labels: ['union'],
        group: ['studentlund']
      },
      ssn2: {
        id: 'le',
        name: 'Lunda Ekonomerna',
        amount: '100',
        interval: 'month',
        intervalCount: '6',
        labels: ['union'],
        group: ['studentlund']
      }
    })
  })
})
