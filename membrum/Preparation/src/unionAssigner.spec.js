/* @flow */

/**
 * @date  2017-08-22
 */

import type { FileResult } from './types'
import { getFaculties, getUpdatedUnions, getUnions } from './unionAssigner'
import { LadokPerson } from './person'
import { config } from './config'

const FACULTY = ['EHL', 'HT', 'JUR', 'KO', 'LTH', 'MED', 'NAT', 'SAM', 'USV']
const EMAIL = 'anEmail@domain.place.com'
const SSN1 = '123456789101'
const SSN2 = '999999999999'

const UNION_MAP = config.TRF.UnionMapping

const newTestFileResult = (
  ssn: string,
  name: string,
  credits: number
): FileResult => {
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

  return {
    people: [person.toJSON()],
    createdAt: 123456789,
    file: 'dummy.txt',
    Index: '12a34b56-c789-10d1-1e1f-g2h131i4j15k'
  }
}

describe('Union assigner.', () => {
  describe('Faculty assignment.', () => {
    it('One.', () => {
      expect(
        getFaculties({ file1: newTestFileResult(SSN1, 'TestPerson1', 1) })
      ).toEqual({
        [SSN1]: 'EHL'
      })
    })
    it('Two.', () => {
      expect(
        getFaculties({ file1: newTestFileResult(SSN1, 'TestPerson2', 2) })
      ).toEqual({
        [SSN1]: 'HT'
      })
    })
    it('Lots.', () => {
      expect(
        getFaculties({ file1: newTestFileResult(SSN1, 'TestPerson3', 8) })
      ).toEqual({
        [SSN1]: 'SAM'
      })
    })
    it('Two people.', () => {
      expect(
        getFaculties({
          file1: newTestFileResult(SSN1, 'TestPersonA', 3),
          file2: newTestFileResult(SSN2, 'TestPersonB', 4)
        })
      ).toEqual({
        [SSN1]: 'JUR',
        [SSN2]: 'KO'
      })
    })
    describe('New faculties.', () => {
      it('No new.', () => {
        expect(
          getUpdatedUnions({
            NewAssignments: {
              1: ['A']
            },
            Users: [
              { userId: 1, email: 'a', name: 'b', points: {}, union: 'A' }
            ]
          })
        ).toEqual({ created: {}, decide: {}, modified: {}, same: { '1': 'A' } })
      })
      it('One modified.', () => {
        expect(
          getUpdatedUnions({
            NewAssignments: {
              1: ['A']
            },
            Users: [
              { userId: 1, email: 'a', name: 'b', points: {}, union: 'B' }
            ]
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
              1: ['Aa']
            },
            Users: [{ userId: 1, email: 'a', name: 'b', points: {} }]
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
              1: ['Aa', 'Bb']
            },
            Users: [{ userId: 1, email: 'a', name: 'b', points: {} }]
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
              1: ['Aa'],
              2: ['Bb'],
              3: ['Cc']
            },
            Users: [
              { userId: 1, email: 'a', name: 'b', points: {} },
              { userId: 2, email: 'a', name: 'b', points: {}, union: 'Bb' },
              { userId: 3, email: 'a', name: 'b', points: {}, union: 'Aa' }
            ]
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
        expect(getUnions(UNION_MAP, { [SSN1]: 'MED' })).toEqual({
          [SSN1]: ['Corpus Medicus']
        })
      })
      it('All faculties.', () => {
        expect(
          getUnions(UNION_MAP, {
            [SSN1]: 'EHL',
            [SSN1]: 'HT',
            [SSN1]: 'JUR',
            [SSN1]: 'KO',
            [SSN1]: 'LTH',
            [SSN1]: 'MED',
            [SSN1]: 'NAT',
            [SSN1]: 'SAM',
            [SSN1]: 'USV'
          })
        ).toEqual({
          [SSN1]: ['LundaEkonomerna'],
          [SSN1]: ['Humanistiska och Teologiska Studentkåren'],
          [SSN1]: ['Juridiska Föreningen'],
          [SSN1]: ['Studentkåren vid Konstnärliga fakulteten i Malmö'],
          [SSN1]: ['Teknologkåren'],
          [SSN1]: ['Corpus Medicus'],
          [SSN1]: ['Lunds Naturvetarkår'],
          [SSN1]: ['Samhällsvetarkåren'],
          [SSN1]: [
            'LundaEkonomerna',
            'Lunds Naturvetarkår',
            'Samhällsvetarkåren'
          ]
        })
      })
    })
  })
})
