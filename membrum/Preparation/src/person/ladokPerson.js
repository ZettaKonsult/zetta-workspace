/* @flow */

/**
 * @date    2017-08-24
 */

import { NumberMap } from 'common-js-utils'

/**
 * Error for when combining two non-equal people.
 */
class NotSamePerson extends Error {}

export const fromJSON = personObject => {
  let newPerson = new LadokPerson(
    personObject.ssn,
    personObject.name,
    personObject.email
  )

  for (let [union, points] of Object.entries(personObject.credits)) {
    newPerson._addUnion(union, points)
  }

  return newPerson
}

export class LadokPerson {
  constructor(ssn, name, email, points, union) {
    this.ssn = ssn
    this.name = name
    this.email = email

    this.points = new NumberMap()
    if (points !== undefined && union !== undefined) {
      this._addUnion(union, Number(points.replace(',', '.')))
    }
  }

  _addUnion(union, points) {
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

  join(ladokPerson) {
    if (!this.samePerson(ladokPerson)) {
      throw new NotSamePerson(
        `Can not combine non-equal ` +
          `ladok people. SSNs:\n    ` +
          `${this.ssn}\n    ${ladokPerson.ssn}`
      )
    }

    this.points.join(ladokPerson.points)
  }

  samePerson(otherPerson) {
    return this.ssn === otherPerson.ssn
  }

  toJSON(): {
    ssn: string,
    name: string,
    email: string,
    points: { [string]: number }
  } {
    let { ssn, name, email, points } = this

    let credits = {}
    for (let [key, value] of points.entries()) {
      credits[key] = value
    }

    return { ssn, name, email, credits }
  }
}
