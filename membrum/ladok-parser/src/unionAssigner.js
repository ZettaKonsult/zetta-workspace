/**
 * Assign LADOK people parsed using the ladok-parser module to unions.
 *
 * @date 2017-10-31
 */

const getAssignment = credits => {
  let maxKey
  let maxValue = Number.MIN_VALUE

  for (let [union, points] of Object.entries(credits)) {
    if (points > maxValue || (points === maxValue && Math.random() >= 0.5)) {
      maxKey = union
      maxValue = points
    }
  }

  return maxKey
}

const getAssignments = peopleFiles => {
  let assignments = {}

  for (let fileResult of Object.values(peopleFiles)) {
    for (let person of Object.values(fileResult.people)) {
      const ssn = person.ssn
      const credits = person.credits
      assignments[ssn] = getAssignment(credits)
    }
  }

  return assignments
}

module.exports = {
  getAssignments
}
