/* @flow */

/**
 * @date 2018-01-15
 */

import { buildAttributes } from './users'

const SSN = 'SSN'
const EMAIL = 'email@domain.com'
const GIVEN_NAME = 'Given'
const FAMILY_NAME = 'Family'
const CREDITS = {
  aKey: 'aValue',
  bKey: 'bValue'
}

describe('User functions.', () => {
  describe('Build attributes.', () => {
    it('Split name.', () => {
      expect(
        buildAttributes({
          ssn: SSN,
          email: EMAIL,
          family_name: FAMILY_NAME,
          given_name: GIVEN_NAME,
          credits: CREDITS
        })
      ).toEqual({
        birthdate: 'SSN',
        email: 'email@domain.com',
        family_name: 'Family',
        given_name: 'Given'
      })
    })
    it('Only family name.', () => {
      expect(
        buildAttributes({
          ssn: SSN,
          email: EMAIL,
          family_name: FAMILY_NAME,
          given_name: '',
          credits: CREDITS
        })
      ).toEqual({
        birthdate: 'SSN',
        email: 'email@domain.com',
        family_name: 'Family',
        given_name: ''
      })
    })
    it('Only given name.', () => {
      expect(
        buildAttributes({
          ssn: SSN,
          email: EMAIL,
          family_name: '',
          given_name: GIVEN_NAME,
          credits: CREDITS
        })
      ).toEqual({
        birthdate: 'SSN',
        email: 'email@domain.com',
        family_name: '',
        given_name: 'Given'
      })
    })
  })
})
