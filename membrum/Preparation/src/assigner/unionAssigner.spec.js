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
              nation: 'Undefined Nation',
              unionName: 'A',
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
            nation: 'Undefined Nation',
            unionName: 'A',
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
              nation: 'Undefined Nation',
              unionName: 'B',
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
            nation: 'Undefined Nation',
            unionName: { next: 'A', old: 'B' },
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
            nation: 'Undefined Nation',
            unionName: 'Aa',
          },
        },
        modified: {},
        same: {},
      });
    });
    it('One decide.', () => {
      expect(
        getUpdatedUnions({
          assignments: {
            '1': ['Aa', 'Bb'],
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
              nation: 'Undefined Nation',
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
            nation: 'Undefined Nation',
            unionName: ['Aa', 'Bb'],
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
              nation: 'Undefined Nation',
              unionName: 'Bb',
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
              nation: 'Undefined Nation',
              unionName: 'Aa',
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
            nation: 'Undefined Nation',
            unionName: 'Aa',
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
            nation: 'Undefined Nation',
            unionName: { next: 'Cc', old: 'Aa' },
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
            nation: 'Undefined Nation',
            unionName: 'Bb',
          },
        },
      });
    });
    it('All new.', () => {});
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
