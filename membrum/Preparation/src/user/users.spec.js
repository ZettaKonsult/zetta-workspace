/* @flow */

/**
 * @date 2018-01-15
 */

import { buildAttributes } from './users'

const SSN = 'SSN'
const EMAIL = 'email@domain.com'
const CREDITS = {
  aKey: 'aValue',
  bKey: 'bValue'
}

describe('User functions.', () => {
  describe('Build attributes.', () => {
    it('No name.', () => {
      try {
        buildAttributes({
          ssn: SSN,
          email: EMAIL,
          credits: CREDITS
        })
        fail('Building attributes without name should raise an error.')
      } catch (error) {
        expect(error.message).toMatch(/[nN]ame/)
      }
    })
    it('One name string.', () => {
      expect(
        buildAttributes({
          ssn: SSN,
          email: EMAIL,
          name: 'My Name',
          credits: CREDITS
        })
      ).toEqual({
        birthdate: 'SSN',
        email: 'email@domain.com',
        family_name: 'Name',
        given_name: 'My'
      })
    })
    it('Split name.', () => {
      expect(
        buildAttributes({
          ssn: SSN,
          email: EMAIL,
          family_name: 'Family',
          given_name: 'Given',
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
          family_name: 'Family',
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
          given_name: 'Given',
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
