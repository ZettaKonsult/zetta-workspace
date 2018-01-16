/* @flow */

/**
 * @date 2017-08-24
 */

import type { LadokPersonJSON } from '../types'
import { NumberMap } from 'common-js-utils'

class NotSamePerson extends Error {}

export class LadokPerson {
  ssn: string
  name: string
  email: string
  credits: NumberMap

  constructor(
    ssn: string,
    name: string,
    email: string,
    unionPoints: string,
    union: string
  ) {
    this.ssn = ssn
    this.name = name
    this.email = email

    this.credits = new NumberMap()
    if (unionPoints !== undefined && union !== undefined) {
      this._addUnion(union, Number(unionPoints.replace(',', '.')))
    }
  }

  _addUnion(union: string, points: number) {
    if (union in this.credits) {
      throw new Error(`Union ${union} already defined!`)
    }
    this.credits.set(union, points)
  }

  getCredits(): { [string]: number } {
    let credits = {}

    for (let [key, value] of this.credits) {
      credits[key] = value
    }

    return credits
  }

  join(person: LadokPerson) {
    if (!this.samePerson(person)) {
      throw new NotSamePerson(
        `Can not combine non-equal ` +
          `ladok people. SSNs:\n    ` +
          `${this.ssn}\n    ${person.ssn}`
      )
    }

    this.credits.join(person.credits)
  }

  samePerson(person: LadokPerson) {
    return this.ssn === person.ssn
  }

  toJSON(): LadokPersonJSON {
    let { ssn, name, email, credits } = this

    let jsonCredits = {}
    for (let [key, value] of credits.entries()) {
      jsonCredits[key] = value
    }

    return { ssn, name, email, credits: jsonCredits }
  }
}

export const fromJSON = (personObject: LadokPersonJSON): LadokPerson => {
  let objectCredits = Object.assign({}, personObject.credits)
  const firstUnion = Object.keys(objectCredits)[0]
  const firstPoints = objectCredits[firstUnion]

  let newPerson = new LadokPerson(
    personObject.ssn,
    personObject.name,
    personObject.email,
    String(firstPoints),
    firstUnion
  )

  for (let [union: string, points: number] of Object.entries(objectCredits)) {
    // Recast required due to flow bug with Object.entries and Object.values.
    const newPoints: number = (points: any)
    newPerson._addUnion(union, newPoints)
  }

  return newPerson
}
