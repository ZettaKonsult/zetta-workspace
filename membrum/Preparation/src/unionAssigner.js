/* @flow */

/**
 * @date 2017-10-31
 */

import type { FileResult, LadokPersonJSON } from './types'
import util from 'util'

const getAssignment = (credits: { [string]: string }) => {
  let maxKey
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
): { [string]: string } => {
  let unions = {}
  for (let [ssn: string, faculty: string] of Object.entries(facultyMap)) {
    unions[ssn] = unionMap[String(faculty)]
  }
  return unions
}

export const getFaculties = (peopleFiles: {
  [string]: FileResult
}): { [string]: string } => {
  let assignments = {}

  for (const file of Object.values(peopleFiles)) {
    // Recast required due to flow bug with Object.entries and Object.values.
    const fileResult: FileResult = (file: any)

    for (const person: LadokPersonJSON of fileResult.people) {
      const ssn = person.ssn
      if (ssn in assignments) {
        continue
      }

      assignments[ssn] = getAssignment(person.credits)
    }
  }

  return assignments
}

export const getUpdatedUnions = (params: {
  NewAssignments: { [string]: [string] },
  Users: [{ userId: string, email: string, name: string, points: string }]
}) => {
  const { NewAssignments: assignments, Users: users } = params

  let result = {
    created: {},
    decide: {},
    modified: {},
    same: {}
  }

  for (let user of users) {
    const ssn = user.userId
    const oldUnion = user.union

    let newUnion = assignments[ssn]
    if (newUnion === undefined) {
      newUnion = [oldUnion]
    }

    if (newUnion.length > 1) {
      result.decide[ssn] = newUnion
      continue
    }

    const unionName = newUnion[0]
    if (oldUnion === undefined) {
      result.created[ssn] = unionName
      continue
    }

    if (oldUnion !== unionName) {
      result.modified[ssn] = { old: oldUnion, next: unionName }
    } else {
      result.same[ssn] = oldUnion
    }
  }

  return result
}
