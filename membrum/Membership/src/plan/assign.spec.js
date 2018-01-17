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
              LTH: '3.0',
              USV: '2.0'
            },
            unionName: 'Teknologkåren'
          },
          ssn2: {
            ssn: 'ssn2',
            email: 'email2@domain1.com',
            credits: {
              HT: '3.0',
              EHL: '4.0'
            },
            unionName: 'Lunda Ekonomerna'
          }
        }
      })
    ).toEqual({
      ssn1: [
        {
          amount: '100',
          group: ['studentlund'],
          id: 'af',
          interval: 'month',
          intervalCount: '6',
          labels: [],
          name: 'Akademiska Föreningen'
        },
        {
          amount: '20',
          group: ['obligatory'],
          id: 'trf',
          interval: 'month',
          intervalCount: '6',
          labels: [],
          name: 'Terminsräkningsföreningen'
        },
        {
          amount: '80',
          group: ['studentlund'],
          id: 'un',
          interval: 'month',
          intervalCount: '6',
          labels: ['nation'],
          name: 'Undefined Nation',
          type: 'trail'
        },
        {
          amount: '0',
          group: ['studentlund'],
          id: 'tek',
          interval: 'month',
          intervalCount: '6',
          labels: ['union'],
          name: 'Teknologkåren'
        }
      ],
      ssn2: [
        {
          amount: '100',
          group: ['studentlund'],
          id: 'af',
          interval: 'month',
          intervalCount: '6',
          labels: [],
          name: 'Akademiska Föreningen'
        },
        {
          amount: '20',
          group: ['obligatory'],
          id: 'trf',
          interval: 'month',
          intervalCount: '6',
          labels: [],
          name: 'Terminsräkningsföreningen'
        },
        {
          amount: '80',
          group: ['studentlund'],
          id: 'un',
          interval: 'month',
          intervalCount: '6',
          labels: ['nation'],
          name: 'Undefined Nation',
          type: 'trail'
        },
        {
          amount: '100',
          group: ['studentlund'],
          id: 'le',
          interval: 'month',
          intervalCount: '6',
          labels: ['union'],
          name: 'Lunda Ekonomerna'
        }
      ]
    })
  })
})
