/* @flow */

/**
 * @date  2017-08-22
 */

import type { UserData } from '../types'
import {
  aggregateResults,
  getFaculties,
  getUpdatedUnions,
  getUnions
} from './unionAssigner'
import { LadokPerson } from '../person/ladokPerson'
import { config } from '../config'

const FACULTY = ['EHL', 'HT', 'JUR', 'KO', 'LTH', 'MED', 'NAT', 'SAM', 'USV']
const EMAIL = 'anEmail@domain.place.com'
const NAME = 'NAME'
const SSN = 'SSN'

const UNION_MAP = config.TRF.UnionMapping

const newTestPerson = (
  ssn: string,
  name: string,
  credits: number
): UserData => {
  let person = new LadokPerson(ssn, name, EMAIL, '11.1', 'EHL')
  for (let i = 1; i < credits; ++i) {
    person.join(
      new LadokPerson(
        ssn,
        name,
        'anEmail@domain.place.com',
        String((i + 1) * 11.1),
        FACULTY[i]
      )
    )
  }
  return person.toJSON()
}

describe('Union assigner.', () => {
  describe('Faculty assignment.', () => {
    it('One.', () => {
      expect(getFaculties({ ssn1: newTestPerson(SSN, NAME, 1) })).toEqual({
        ssn1: 'EHL'
      })
    })
    it('Two.', () => {
      expect(getFaculties({ ssn1: newTestPerson(SSN, NAME, 2) })).toEqual({
        ssn1: 'HT'
      })
    })
    it('Lots.', () => {
      expect(getFaculties({ ssn1: newTestPerson(SSN, NAME, 8) })).toEqual({
        ssn1: 'SAM'
      })
    })
    it('Two people.', () => {
      expect(
        getFaculties({
          ssn1: newTestPerson(SSN, NAME, 3),
          ssn2: newTestPerson(SSN, NAME, 4)
        })
      ).toEqual({
        ssn1: 'JUR',
        ssn2: 'KO'
      })
    })
    describe('New faculties.', () => {
      it('No new.', () => {
        expect(
          getUpdatedUnions({
            NewAssignments: {
              '1': ['A']
            },
            Users: {
              '1': {
                ssn: '1',
                email: 'a',
                name: 'b',
                credits: {},
                nation: 'Undefined Nation',
                unionName: 'A'
              }
            }
          })
        ).toEqual({
          created: {},
          modified: {},
          same: {
            '1': {
              credits: {},
              email: 'a',
              name: 'b',
              ssn: '1',
              nation: 'Undefined Nation',
              unionName: 'A'
            }
          }
        })
      })
      it('One modified.', () => {
        expect(
          getUpdatedUnions({
            NewAssignments: {
              '1': ['A']
            },
            Users: {
              '1': {
                ssn: '1',
                email: 'a',
                name: 'b',
                credits: {},
                nation: 'Undefined Nation',
                unionName: 'B'
              }
            }
          })
        ).toEqual({
          created: {},
          modified: {
            '1': {
              credits: {},
              email: 'a',
              name: 'b',
              ssn: '1',
              nation: 'Undefined Nation',
              unionName: { next: 'A', old: 'B' }
            }
          },
          same: {}
        })
      })
      it('One new.', () => {
        expect(
          getUpdatedUnions({
            NewAssignments: {
              '1': ['Aa']
            },
            Users: { '1': { ssn: '1', email: 'a', name: 'b', credits: {} } }
          })
        ).toEqual({
          created: {
            '1': {
              credits: {},
              email: 'a',
              name: 'b',
              ssn: '1',
              nation: 'Undefined Nation',
              unionName: 'Aa'
            }
          },
          modified: {},
          same: {}
        })
      })
      it('One decide.', () => {
        expect(
          getUpdatedUnions({
            NewAssignments: {
              '1': ['Aa', 'Bb']
            },
            Users: {
              '1': {
                ssn: '1',
                email: 'a',
                name: 'b',
                nation: 'Undefined Nation',
                credits: {}
              }
            }
          })
        ).toEqual({
          created: {
            '1': {
              credits: {},
              email: 'a',
              name: 'b',
              ssn: '1',
              nation: 'Undefined Nation',
              unionName: ['Aa', 'Bb']
            }
          },
          modified: {},
          same: {}
        })
      })
      it('One new, one modified.', () => {
        expect(
          getUpdatedUnions({
            NewAssignments: {
              '1': ['Aa'],
              '2': ['Bb'],
              '3': ['Cc']
            },
            Users: {
              '1': { ssn: '1', email: 'a', name: 'b', credits: {} },
              '2': {
                ssn: '2',
                email: 'a',
                name: 'b',
                credits: {},
                nation: 'Undefined Nation',
                unionName: 'Bb'
              },
              '3': {
                ssn: '3',
                email: 'a',
                name: 'b',
                credits: {},
                nation: 'Undefined Nation',
                unionName: 'Aa'
              }
            }
          })
        ).toEqual({
          created: {
            '1': {
              credits: {},
              email: 'a',
              name: 'b',
              ssn: '1',
              nation: 'Undefined Nation',
              unionName: 'Aa'
            }
          },
          modified: {
            '3': {
              credits: {},
              email: 'a',
              name: 'b',
              ssn: '3',
              nation: 'Undefined Nation',
              unionName: { next: 'Cc', old: 'Aa' }
            }
          },
          same: {
            '2': {
              credits: {},
              email: 'a',
              name: 'b',
              ssn: '2',
              nation: 'Undefined Nation',
              unionName: 'Bb'
            }
          }
        })
      })
      it('All new.', () => {})
    })
    describe('Union assignment.', () => {
      it('From faculty.', () => {
        expect(getUnions(UNION_MAP, { [SSN]: 'MED' })).toEqual({
          [SSN]: ['Corpus Medicus']
        })
      })
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
            [SSN]: 'USV'
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
          [SSN]: [
            'LundaEkonomerna',
            'Lunds Naturvetarkår',
            'Samhällsvetarkåren'
          ]
        })
      })
    })
    describe('Aggregate users.', () => {
      it('No people.', () => {
        expect(
          aggregateResults({
            res1: {
              people: [],
              createdAt: 1,
              file: 'aFile',
              Index: 'AnIndex'
            },
            res2: {
              people: [],
              createdAt: 1,
              file: 'aFile',
              Index: 'AnIndex'
            }
          })
        ).toEqual({})
      })
      it('One empty.', () => {
        expect(
          aggregateResults({
            res1: {
              people: [
                newTestPerson(SSN + 'a', NAME, 1),
                newTestPerson(SSN + 'b', NAME, 2)
              ],
              createdAt: 1,
              file: 'aFile',
              Index: 'AnIndex'
            },
            res2: {
              people: [],
              createdAt: 1,
              file: 'aFile',
              Index: 'AnIndex'
            }
          })
        ).toEqual({
          SSNa: {
            credits: { EHL: 11.1 },
            email: 'anEmail@domain.place.com',
            given_name: 'Name',
            family_name: '',
            ssn: 'SSNa'
          },
          SSNb: {
            credits: { EHL: 11.1, HT: 22.2 },
            email: 'anEmail@domain.place.com',
            given_name: 'Name',
            family_name: '',
            ssn: 'SSNb'
          }
        })
      })
      it('Two in both.', () => {
        expect(
          aggregateResults({
            res1: {
              people: [
                newTestPerson(SSN + 'a', NAME, 1),
                newTestPerson(SSN + 'b', NAME, 2)
              ],
              createdAt: 1,
              file: 'aFile',
              Index: 'AnIndex'
            },
            res2: {
              people: [
                newTestPerson(SSN + 'a', NAME, 1),
                newTestPerson(SSN + 'c', NAME, 2)
              ],
              createdAt: 1,
              file: 'aFile',
              Index: 'AnIndex'
            }
          })
        ).toEqual({
          SSNa: {
            credits: { EHL: 11.1 },
            email: 'anEmail@domain.place.com',
            given_name: 'Name',
            family_name: '',
            ssn: 'SSNa'
          },
          SSNb: {
            credits: { EHL: 11.1, HT: 22.2 },
            email: 'anEmail@domain.place.com',
            given_name: 'Name',
            family_name: '',
            ssn: 'SSNb'
          },
          SSNc: {
            credits: { EHL: 11.1, HT: 22.2 },
            email: 'anEmail@domain.place.com',
            given_name: 'Name',
            family_name: '',
            ssn: 'SSNc'
          }
        })
      })
    })
  })
})
