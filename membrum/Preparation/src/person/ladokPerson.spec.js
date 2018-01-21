/* @flow */

/**
 * @date 2017-08-22
 */

import { fromJSON, LadokPerson } from './ladokPerson'

const PERSON1 = new LadokPerson(
  '9105040035',
  'FREDRIK PALMQUIST',
  'dat11fpa@student.lu.se',
  '35.5',
  'EHL'
)

const PERSON2 = new LadokPerson(
  '9006211537',
  'ZIMON KUHS',
  'eng08zku@student.lu.se',
  '21,5',
  'EHL'
)

const newTestPerson = () => {
  return new LadokPerson(
    '9105040035',
    'FREDRIK PALMQUIST',
    'dat11fpa@student.lu.se',
    '35.5',
    'EHL'
  )
}

describe('Ladok person.', () => {
  describe('getCredits().', () => {
    expect(PERSON1.getCredits()).toEqual({ EHL: 35.5 })
    expect(PERSON2.getCredits()).toEqual({ EHL: 21.5 })
  })
  describe('join().', () => {
    it('Same nation.', () => {
      const person = newTestPerson()

      person.join(PERSON1)
      expect(PERSON1.getCredits()).toEqual({ EHL: 35.5 })
      expect(person.getCredits()).toEqual({ EHL: 71 })
    })
    it('New nation.', () => {
      const person = newTestPerson()

      person.join(
        new LadokPerson(
          '9105040035',
          'FREDRIK PALMQUIST',
          'dat11fpa@student.lu.se',
          '35.5',
          'HT'
        )
      )
      expect(PERSON1.getCredits()).toEqual({ EHL: 35.5 })
      expect(person.getCredits()).toEqual({ EHL: 35.5, HT: 35.5 })
    })
    it('Invalid.', () => {
      const person = newTestPerson()
      try {
        person.join(PERSON2)
        fail(
          'Combining two people with different SSN' + 'should raise an error.'
        )
      } catch (error) {
        expect(error.message).toMatch(
          `Can not combine non-equal ` +
            `ladok people. SSNs:\n    ` +
            `${person.ssn}\n    ${PERSON2.ssn}`
        )
      }
    })
  })
  describe('samePerson()', () => {
    it('Equal people.', () => {
      expect(PERSON1.samePerson(PERSON1)).toBe(true)
      expect(
        PERSON1.samePerson(new LadokPerson(PERSON1.ssn, 'A', 'B', 'C', 'D'))
      ).toBe(true)
    })
    it('Non-equal people.', () => {
      expect(PERSON1.samePerson(PERSON2)).toBe(false)
      expect(
        PERSON1.samePerson(new LadokPerson(PERSON2.ssn, 'A', 'B', 'C', 'D'))
      ).toBe(false)
    })
  })
  describe('toJSON()', () => {
    it('Without joining.', () => {
      expect(PERSON1.toJSON()).toEqual({
        ssn: '9105040035',
        name: 'FREDRIK PALMQUIST',
        email: 'dat11fpa@student.lu.se',
        credits: {
          EHL: 35.5
        }
      })
      expect(PERSON2.toJSON()).toEqual({
        ssn: '9006211537',
        name: 'ZIMON KUHS',
        email: 'eng08zku@student.lu.se',
        credits: {
          EHL: 21.5
        }
      })
    })
    it('With joining.', () => {
      const person = newTestPerson()
      expect(person.toJSON()).toEqual({
        ssn: '9105040035',
        name: 'FREDRIK PALMQUIST',
        email: 'dat11fpa@student.lu.se',
        credits: {
          EHL: 35.5
        }
      })
      person.join(PERSON1)
      expect(person.toJSON()).toEqual({
        ssn: '9105040035',
        name: 'FREDRIK PALMQUIST',
        email: 'dat11fpa@student.lu.se',
        credits: {
          EHL: 71
        }
      })
      expect(PERSON1.toJSON()).toEqual({
        ssn: '9105040035',
        name: 'FREDRIK PALMQUIST',
        email: 'dat11fpa@student.lu.se',
        credits: {
          EHL: 35.5
        }
      })
    })
  })
  it('From JSON.', () => {
    expect(fromJSON(PERSON1.toJSON())).toEqual(PERSON1)
    expect(fromJSON(PERSON2.toJSON())).toEqual(PERSON2)
    expect(fromJSON(newTestPerson().toJSON())).toEqual(newTestPerson())
  })
})
