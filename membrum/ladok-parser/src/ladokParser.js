/**
 * LADOK parser.
 *
 * @date  2017-08-22
 */

const arrayEquals = require('array-equal')
const path = require('path')
const { listFiles } = require('common-js-utils')
const { parseCSVFile, parseCSVLines } = require('zk-csv-parser')
const { LadokPerson } = require('./person')

const EXPECTED_COLUMNS = [
  'Pnr',
  'Namn',
  'Epostadress',
  'Registrerade po�ng',
  ''
]
const IGNORE = 8

class InvalidFile extends Error {}

const parseFile = async (filePath, json = false) => {
  return aggregatePeople(
    await parseCSVFile(filePath, { delimiter: ';', skipFirst: IGNORE }),
    path.basename(filePath),
    json
  )
}

const parseString = async (stringData, filePath, json = false) => {
  let result = []
  try {
    result = await parseCSVLines(
      stringData.split(/[ \t]*[\r]?\n[ \t]*/),
      {
        delimiter: ';',
        skipFirst: IGNORE
      })
  } catch (error) {
    console.error(`Error while parsing raw data:\n${error}`)
  }
  return aggregatePeople(result, path.basename(filePath), json)
}

const aggregatePeople = (lines, fileName, json = false) => {
  checkHeader(lines)
  const unionName = getUnion(fileName, lines)
  lines = lines.slice(4, lines.length).filter(element => element.length > 3)

  let people = []
  for (let line of lines) {
    const info = [...line]
    people.push(new LadokPerson(info[0], info[1], info[2], info[3], unionName))
  }

  if (json) {
    let jsonPeople = []
    for (let person of people) {
      jsonPeople.push(person.toJSON())
    }
    people = jsonPeople
  }

  return people
}

const parseDirectory = async (filePath, json = false) => {
  let people = {}

  try {
    for (let file of (await listFiles(filePath))['files']) {
      addPeople(people, await parseFile(filePath + '/' + file))
    }
  } catch (error) {
    console.error(`Error parsing directory:\n${error}`)
  }

  return json ? toJSON(people) : people
}

const toJSON = people => {
  let json = {}

  for (let [ssn, person] of Object.entries(people)) {
    json[ssn] = person.credits()
  }

  return json
}

/**
 * Combines two maps of people with each other.
 */
const addPeople = (people, newPeople) => {
  for (let person of newPeople) {
    const ssn = person.ssn

    if (ssn in people) {
      people[ssn].join(person)
    } else {
      people[ssn] = person
    }
  }
}

/**
 * Verifies that the Ladok file has the correct format
 */
const checkHeader = lines => {
  const offset = 3
  const columns = lines[offset]
  if (!arrayEquals(columns, EXPECTED_COLUMNS)) {
    throw new InvalidFile(
      'Invalid LADOK file, column line not ' +
        `found in expected position. Expected\n    ${EXPECTED_COLUMNS}\nas ` +
        `row ${IGNORE + offset}, got\n    ${columns}.`
    )
  }
}

/**
 * The union name is derived from the parsed file's name.
 */
const getUnion = (fileName, lines) => {
  let parts = fileName.split('.')[0].split(/TRF_[H|V]\d\d_/)
  if (parts.length === 2) {
    return parts[1]
  }
  parts = lines[0][0].split('Lokal klass:')
  if (parts.length === 2) {
    return parts[1].trim()
  }
  throw new InvalidFile(
    `Invalid LADOK file '${fileName}', ` + `could not determine union.`
  )
}

module.exports = {
  InvalidFile,
  getUnion,
  parseFile,
  parseString,
  parseDirectory
}
