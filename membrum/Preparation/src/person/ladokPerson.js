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
  points: NumberMap

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

    this.points = new NumberMap()
    if (unionPoints !== undefined && union !== undefined) {
      this._addUnion(union, Number(unionPoints.replace(',', '.')))
    }
  }

  _addUnion(union: string, points: number) {
    if (union in this.points) {
      throw new Error(`Union ${union} already defined!`)
    }
    this.points.set(union, points)
  }

  credits() {
    let credits = {}

    for (let [key, value] of this.points) {
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

    this.points.join(person.points)
  }

  samePerson(person: LadokPerson) {
    return this.ssn === person.ssn
  }

  toJSON(): LadokPersonJSON {
    let { ssn, name, email, points } = this

    let credits = {}
    for (let [key, value] of points.entries()) {
      credits[key] = value
    }

    return { ssn, name, email, credits }
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
