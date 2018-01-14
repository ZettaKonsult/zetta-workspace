/* @flow */

/**
 * @date  2017-08-22
 */

import type { FileResult, LadokPersonJSON } from './types'
import { getFaculties, getUpdatedUnions, getUnions } from './unionAssigner'
import { LadokPerson } from './person'
import { config } from './config'

const FACULTY = ['EHL', 'HT', 'JUR', 'KO', 'LTH', 'MED', 'NAT', 'SAM', 'USV']
const EMAIL = 'anEmail@domain.place.com'
const NAME = 'NAME'
const SSN = 'SSN'

const UNION_MAP = config.TRF.UnionMapping

const newTestFileResult = (amount: number): FileResult => {
  return {
    people: [newTestPeople(amount).toJSON()],
    createdAt: 123456789,
    file: 'dummy.txt',
    Index: '12a34b56-c789-10d1-1e1f-g2h131i4j15k'
  }
}

const newTestPeople = (amount: number) => {
  let people = []
  for (let i = 0; i < amount; ++i) {
    people.push(newTestPerson(SSN + i, NAME + i, (i + 1) % FACULTY.length))
  }
  return people
}

const newTestPerson = (
  ssn: string,
  name: string,
  credits: number
): LadokPersonJSON => {
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
                unionId: 'A'
              }
            }
          })
        ).toEqual({ created: {}, decide: {}, modified: {}, same: { '1': 'A' } })
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
                unionId: 'B'
              }
            }
          })
        ).toEqual({
          created: {},
          decide: {},
          modified: { '1': { next: 'A', old: 'B' } },
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
          created: { '1': 'Aa' },
          decide: {},
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
            Users: { '1': { ssn: '1', email: 'a', name: 'b', credits: {} } }
          })
        ).toEqual({
          created: {},
          decide: { '1': ['Aa', 'Bb'] },
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
                unionId: 'Bb'
              },
              '3': {
                ssn: '3',
                email: 'a',
                name: 'b',
                credits: {},
                unionId: 'Aa'
              }
            }
          })
        ).toEqual({
          created: { '1': 'Aa' },
          decide: {},
          modified: { '3': { next: 'Cc', old: 'Aa' } },
          same: { '2': 'Bb' }
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
  })
})
