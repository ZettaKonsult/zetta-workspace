/* @flow */

/**
 * @date 2017-10-31
 */

import type {
  FileResult,
  LadokPersonJSON,
  UnionPartition,
  UserData
} from '../types'

import { config } from '../config'
const DEFAULT_NATION = config.TRF.Nations.Undefined

const getAssignment = (person: LadokPersonJSON): string => {
  const credits = person.credits
  let maxKey: string = ''
  let maxValue: number = Number.MIN_VALUE

  for (let [union, unionCredits] of Object.entries(credits)) {
    const points = Number(unionCredits)
    if (points > maxValue || (points === maxValue && Math.random() >= 0.5)) {
      maxKey = union
      maxValue = points
    }
  }

  return maxKey
}

export const getUnions = (
  unionMap: { [string]: Array<string> },
  facultyMap: { [string]: string }
): { [string]: [string] } => {
  let unions = {}
  for (let [ssn: string, faculty: string] of Object.entries(facultyMap)) {
    unions[ssn] = unionMap[String(faculty)]
  }
  return unions
}

export const aggregateResults = (peopleFiles: {
  [string]: FileResult
}): { [string]: LadokPersonJSON } => {
  let people = {}

  for (const file of Object.values(peopleFiles)) {
    // Recast required due to flow bug with Object.entries and Object.values.
    const fileResult: FileResult = (file: any)

    for (const person: LadokPersonJSON of fileResult.people) {
      const ssn = person.ssn
      if (ssn in people) {
        people[ssn].credits = Object.assign(people[ssn].credits, person.credits)
      } else {
        people[ssn] = person
      }
    }
  }

  return people
}

export const getFaculties = (people: {
  [string]: LadokPersonJSON
}): { [string]: string } =>
  Object.keys(people).reduce(
    (object, ssn) => ({
      ...object,
      [ssn]: getAssignment(people[ssn])
    }),
    {}
  )

export const getUpdatedUnions = (params: {
  NewAssignments: { [string]: any },
  Users: { [string]: UserData }
}): UnionPartition => {
  const { NewAssignments: assignments, Users: users } = params

  let result = {
    created: {},
    modified: {},
    same: {}
  }

  for (let ssn of Object.keys(assignments)) {
    const user = users[ssn]
    const oldUnion = user.union

    let newUnion = assignments[ssn]
    if (newUnion === undefined) {
      newUnion = [oldUnion]
    }

    if (newUnion.length === 1) {
      newUnion = newUnion[0]
    }

    if (oldUnion === undefined) {
      result.created[ssn] = {
        ...user,
        nation: DEFAULT_NATION,
        union: newUnion
      }
    } else if (oldUnion !== newUnion) {
      result.modified[ssn] = {
        ...user,
        union: { old: oldUnion, next: newUnion }
      }
    } else {
      result.same[ssn] = { ...user, union: oldUnion }
    }
  }

  return result
}
