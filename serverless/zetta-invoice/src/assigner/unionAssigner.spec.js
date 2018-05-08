/**
 * @date  2017-08-22
 */

import { getFaculties, getUpdatedUnions, getUnions } from './unionAssigner';

const FACULTY = ['EHL', 'HT', 'JUR', 'KO', 'LTH', 'MED', 'NAT', 'SAM', 'USV'];
const EMAIL = 'anEmail@domain.place.com';
const NAME = 'NAME';
const SSN = 'SSN';

const UNION_MAP = {
  EHL: ['Lunda Ekonomerna'],
  HT: ['Humanistiska och Teologiska Studentkåren'],
  JUR: ['Juridiska Föreningen'],
  KO: ['Studentkåren vid Konstnärliga fakulteten i Malmö'],
  LTH: ['Teknologkåren'],
  MED: ['Corpus Medicus'],
  NAT: ['Lunds Naturvetarkår'],
  SAM: ['Samhällsvetarkåren'],
  USV: ['LundaEkonomerna', 'Lunds Naturvetarkår', 'Samhällsvetarkåren'],
};

describe('Union assigner.', () => {
  describe('New faculties.', () => {
    it('No new.', () => {
      expect(
        getUpdatedUnions({
          assignments: {
            '1': ['A'],
          },
          users: {
            '1': {
              ssn: '1',
              attributes: {
                birthdate: '1',
                email: 'a',
                given_name: 'b',
                family_name: '',
              },
              credits: {},
              reccuringPayments: ['A'],
            },
          },
        })
      ).toEqual({
        created: {},
        modified: {},
        same: {
          '1': {
            credits: {},
            ssn: '1',
            attributes: {
              birthdate: '1',
              email: 'a',
              given_name: 'b',
              family_name: '',
            },
            reccuringPayments: ['A'],
          },
        },
      });
    });

    it('One modified.', () => {
      expect(
        getUpdatedUnions({
          assignments: {
            '1': ['A'],
          },
          users: {
            '1': {
              ssn: '1',
              attributes: {
                birthdate: '1',
                email: 'a',
                given_name: 'b',
                family_name: '',
              },
              credits: {},
              reccuringPayments: ['B'],
            },
          },
        })
      ).toEqual({
        created: {},
        modified: {
          '1': {
            credits: {},
            attributes: {
              birthdate: '1',
              email: 'a',
              given_name: 'b',
              family_name: '',
            },
            ssn: '1',
            reccuringPayments: ['A'],
          },
        },
        same: {},
      });
    });

    it('One new.', () => {
      expect(
        getUpdatedUnions({
          assignments: {
            '1': ['Aa'],
          },
          users: {
            '1': {
              ssn: '1',
              attributes: {
                birthdate: '1',
                email: 'a',
                given_name: 'b',
                family_name: '',
              },
              credits: {},
            },
          },
        })
      ).toEqual({
        created: {
          '1': {
            credits: {},
            attributes: {
              birthdate: '1',
              email: 'a',
              given_name: 'b',
              family_name: '',
            },
            ssn: '1',
            reccuringPayments: ['Aa'],
          },
        },
        modified: {},
        same: {},
      });
    });

    it('One decide.', () => {
      const assignments = { '1': ['Aa', 'Bb'] };
      const users = {
        '1': {
          ssn: '1',
          attributes: {
            birthdate: '1',
            email: 'a',
            given_name: 'b',
            family_name: '',
          },
          credits: {},
        },
      };

      const result = getUpdatedUnions({
        assignments,
        users,
      });

      expect(result).toEqual({
        created: {
          '1': {
            credits: {},
            attributes: {
              birthdate: '1',
              email: 'a',
              given_name: 'b',
              family_name: '',
            },
            ssn: '1',
            reccuringPayments: ['Aa'],
          },
        },
        modified: {},
        same: {},
      });
    });

    it('One new, one modified.', () => {
      expect(
        getUpdatedUnions({
          assignments: {
            '1': ['Aa'],
            '2': ['Bb'],
            '3': ['Cc'],
          },
          users: {
            '1': {
              ssn: '1',
              attributes: {
                birthdate: '1',
                email: 'a',
                given_name: 'b',
                family_name: '',
              },
              credits: {},
            },
            '2': {
              ssn: '2',
              attributes: {
                birthdate: '1',
                email: 'a',
                given_name: 'b',
                family_name: '',
              },
              credits: {},
              reccuringPayments: ['Bb'],
            },
            '3': {
              ssn: '3',
              attributes: {
                birthdate: '1',
                email: 'a',
                given_name: 'b',
                family_name: '',
              },
              credits: {},
              reccuringPayments: ['Aa'],
            },
          },
        })
      ).toEqual({
        created: {
          '1': {
            credits: {},
            attributes: {
              birthdate: '1',
              email: 'a',
              given_name: 'b',
              family_name: '',
            },
            ssn: '1',
            reccuringPayments: ['Aa'],
          },
        },
        modified: {
          '3': {
            credits: {},
            attributes: {
              birthdate: '1',
              email: 'a',
              given_name: 'b',
              family_name: '',
            },
            ssn: '3',
            reccuringPayments: ['Cc'],
          },
        },
        same: {
          '2': {
            credits: {},
            attributes: {
              birthdate: '1',
              email: 'a',
              given_name: 'b',
              family_name: '',
            },
            ssn: '2',
            reccuringPayments: ['Bb'],
          },
        },
      });
    });
  });

  describe('Union assignment.', () => {
    it('From faculty.', () => {
      expect(getUnions(UNION_MAP, { [SSN]: 'MED' })).toEqual({
        [SSN]: ['Corpus Medicus'],
      });
    });
    it('All faculties.', () => {
      expect(
        getUnions(UNION_MAP, {
          [SSN]: 'EHL',
          [SSN]: 'HT',
          [SSN]: 'JUR',
          [SSN]: 'KO',
          [SSN]: 'LTH',
          [SSN]: 'MED',
          [SSN]: 'NAT',
          [SSN]: 'SAM',
          [SSN]: 'USV',
        })
      ).toEqual({
        [SSN]: ['LundaEkonomerna'],
        [SSN]: ['Humanistiska och Teologiska Studentkåren'],
        [SSN]: ['Juridiska Föreningen'],
        [SSN]: ['Studentkåren vid Konstnärliga fakulteten i Malmö'],
        [SSN]: ['Teknologkåren'],
        [SSN]: ['Corpus Medicus'],
        [SSN]: ['Lunds Naturvetarkår'],
        [SSN]: ['Samhällsvetarkåren'],
        [SSN]: ['LundaEkonomerna', 'Lunds Naturvetarkår', 'Samhällsvetarkåren'],
      });
    });
  });
});
