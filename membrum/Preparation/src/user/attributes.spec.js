/* @flow */

/**
 * @date 2018-01-15
 */

import { applyFormatting } from './attributes';

describe('Attribute management.', () => {
  describe('Get name.', () => {
    it('Empty name.', () => {
      try {
        applyFormatting({
          user: {
            ssn: 'SSN',
            name: '\t ',
            email: 'aMail@mailmail.mail',
            credits: { EHL: '1.0' },
          },
          formats: ['all'],
        });
        fail('White-space name should raise an error.');
      } catch (error) {
        expect(error.message).toMatch(/No name/);
      }
    });
    it('Only family name.', () => {
      expect(
        applyFormatting({
          user: {
            ssn: 'SSN',
            email: 'aMail@mailmail.mail',
            credits: { EHL: '1.0' },
            name: ' Family',
          },
          formats: ['all'],
        })
      ).toEqual({
        family_name: 'Family',
        given_name: '',
      });
    });
    it('Only given name.', () => {
      expect(
        applyFormatting({
          user: {
            ssn: 'SSN',
            email: 'aMail@mailmail.mail',
            credits: { EHL: '1.0' },
            name: 'Given',
          },
          formats: ['all'],
        })
      ).toEqual({
        family_name: '',
        given_name: 'Given',
      });
    });
    it('Both names.', () => {
      expect(
        applyFormatting({
          user: {
            ssn: 'SSN',
            email: 'aMail@mailmail.mail',
            credits: { EHL: '1.0' },
            name: 'Given Family',
          },
          formats: ['all'],
        })
      ).toEqual({
        family_name: 'Family',
        given_name: 'Given',
      });
    });
    describe('Specific transformations.', () => {
      it('Lowercase.', () => {
        expect(
          applyFormatting({
            user: {
              ssn: 'SSN',
              email: 'aMail@mailmail.mail',
              credits: { EHL: '1.0' },
              name: 'GIVEN FAMILY',
            },
            formats: ['lowerCase'],
          })
        ).toEqual({
          family_name: 'family',
          given_name: 'given',
        });
      });
      it('Capitalize first.', () => {
        expect(
          applyFormatting({
            user: {
              ssn: 'SSN',
              email: 'aMail@mailmail.mail',
              credits: { EHL: '1.0' },
              name: 'given family',
            },
            formats: ['capitalizeFirst'],
          })
        ).toEqual({
          family_name: 'Family',
          given_name: 'Given',
        });
      });
    });
  });
});
