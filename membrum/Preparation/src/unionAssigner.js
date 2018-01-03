/* @flow */

/**
 * @date 2017-10-31
 */

import util from 'util'
const getAssignment = (credits: Array<{ string: number }>) => {
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

export const getAssignments = peopleFiles => {
  let assignments = {}

  for (let fileResult of Object.values(peopleFiles)) {
    for (let person of Object.values(fileResult.people)) {
      const ssn = person.ssn
      const points = person.credits()
      assignments[ssn] = getAssignment(points)
    }
  }

  return assignments
}
