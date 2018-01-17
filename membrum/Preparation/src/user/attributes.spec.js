/* @flow */

/**
 * @date 2018-01-15
 */

import { changeName } from './attributes'

describe('Attribute management.', () => {
  describe('Change name.', () => {
    it('Empty name.', () => {
      try {
        changeName({
          user: {
            ssn: 'SSN',
            email: 'aMail@mailmail.mail',
            credits: { EHL: '1.0' },
            name: '\t '
          },
          formats: ['all']
        })
        fail('White-space name should raise an error.')
      } catch (error) {
        expect(error.message).toMatch(/No name/)
      }
    })
    it('Only family name.', () => {
      expect(
        changeName({
          user: {
            ssn: 'SSN',
            email: 'aMail@mailmail.mail',
            credits: { EHL: '1.0' },
            name: ' Family'
          },
          formats: ['all']
        })
      ).toEqual({
        credits: { EHL: '1.0' },
        email: 'aMail@mailmail.mail',
        family_name: 'Family',
        given_name: '',
        ssn: 'SSN'
      })
    })
    it('Only given name.', () => {
      expect(
        changeName({
          user: {
            ssn: 'SSN',
            email: 'aMail@mailmail.mail',
            credits: { EHL: '1.0' },
            name: 'Given'
          },
          formats: ['all']
        })
      ).toEqual({
        credits: { EHL: '1.0' },
        email: 'aMail@mailmail.mail',
        family_name: '',
        given_name: 'Given',
        ssn: 'SSN'
      })
    })
    it('Both names.', () => {
      expect(
        changeName({
          user: {
            ssn: 'SSN',
            email: 'aMail@mailmail.mail',
            credits: { EHL: '1.0' },
            name: 'Given Family'
          },
          formats: ['all']
        })
      ).toEqual({
        credits: { EHL: '1.0' },
        email: 'aMail@mailmail.mail',
        family_name: 'Family',
        given_name: 'Given',
        ssn: 'SSN'
      })
    })
    describe('Specific transformations.', () => {
      it('Lowercase.', () => {
        expect(
          changeName({
            user: {
              ssn: 'SSN',
              email: 'aMail@mailmail.mail',
              credits: { EHL: '1.0' },
              name: 'GIVEN FAMILY'
            },
            formats: ['lowerCase']
          })
        ).toEqual({
          credits: { EHL: '1.0' },
          email: 'aMail@mailmail.mail',
          family_name: 'family',
          given_name: 'given',
          ssn: 'SSN'
        })
      })
      it('Capitalize first.', () => {
        expect(
          changeName({
            user: {
              ssn: 'SSN',
              email: 'aMail@mailmail.mail',
              credits: { EHL: '1.0' },
              name: 'given family'
            },
            formats: ['capitalizeFirst']
          })
        ).toEqual({
          credits: { EHL: '1.0' },
          email: 'aMail@mailmail.mail',
          family_name: 'Family',
          given_name: 'Given',
          ssn: 'SSN'
        })
      })
    })
  })
})
