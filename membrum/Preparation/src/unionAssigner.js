/* @flow */

/**
 * @date 2017-10-31
 */

import type { FileResult, LadokPersonJSON } from './types'

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
