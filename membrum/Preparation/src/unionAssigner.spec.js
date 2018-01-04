/* @flow */

/**
 * @date  2017-08-22
 */

import { getAssignments } from './unionAssigner'
import { LadokPerson } from './person'

const FACULTY = ['EHL', 'HT', 'JUR', 'KO', 'LTH', 'MED', 'NAT', 'SAM', 'USV']
const EMAIL = 'anEmail@domain.place.com'
const SSN1 = '123456789101'
const SSN2 = '999999999999'

const newTestPerson = (
  ssn: string,
  name: string,
  credits: number
): LadokPerson => {
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
    people: [person],
    createdAt: 123456789,
    file: 'dummy.txt',
    Index: '12a34b56-c789-10d1-1e1f-g2h131i4j15k'
  }
}

describe('Union assigner.', () => {
  it('One faculty.', () => {
    expect(getAssignments([newTestPerson(SSN1, 'TestPerson1', 1)])).toEqual({
      [SSN1]: 'EHL'
    })
  })
  it('Two faculties.', () => {
    expect(getAssignments([newTestPerson(SSN1, 'TestPerson2', 2)])).toEqual({
      [SSN1]: 'HT'
    })
  })
  it('Lots of faculties.', () => {
    expect(getAssignments([newTestPerson(SSN1, 'TestPerson3', 8)])).toEqual({
      [SSN1]: 'SAM'
    })
  })
  it('Two people.', () => {
    expect(
      getAssignments([
        newTestPerson(SSN1, 'TestPersonA', 3),
        newTestPerson(SSN2, 'TestPersonB', 4)
      ])
    ).toEqual({
      [SSN1]: 'JUR',
      [SSN2]: 'KO'
    })
  })
})
