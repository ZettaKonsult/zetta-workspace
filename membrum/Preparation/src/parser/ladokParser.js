/* @flow */

/**
 * @date  2017-08-22
 */

import * as path from 'path'
import { listFiles } from 'common-js-utils'
import { parseCSVFile, parseCSVLines } from 'zk-csv-parser'
import { config } from '../config'
import { LadokPerson } from '../person/ladokPerson'

// To do: find (or make) one that does not necessitate requires.
const arrayEquals = require('array-equal')

const IGNORE = config.Ladok.File.IgnoreLines

export class InvalidFile extends Error {}

export const parseFile = async (
  filePath: string
): Promise<Array<LadokPerson>> => {
  return aggregatePeople(
    await parseCSVFile(filePath, { delimiter: ';', skipFirst: IGNORE }),
    path.basename(filePath)
  )
}

export const parseString = async (
  stringData: string,
  filePath: string
): Promise<Array<LadokPerson>> => {
  let result = []
  try {
    result = await parseCSVLines(stringData.split(/[ \t]*[\r]?\n[ \t]*/), {
      delimiter: ';',
      skipFirst: IGNORE
    })
  } catch (error) {
    console.error(`Error while parsing raw data:\n${error}`)
  }
  return aggregatePeople(result, path.basename(filePath))
}

const aggregatePeople = (
  lines: Array<Array<string>>,
  fileName: string
): Array<LadokPerson> => {
  checkHeader(lines)
  const unionName = getUnion(fileName, lines)
  lines = lines.slice(4, lines.length).filter(element => element.length > 3)

  let people = []
  for (let line of lines) {
    const info = [...line]
    people.push(new LadokPerson(info[0], info[1], info[2], info[3], unionName))
  }

  return people
}

export const parseDirectory = async (
  filePath: string
): { [string]: LadokPerson } => {
  let people = {}

  try {
    for (let file of (await listFiles(filePath))['files']) {
      addPeople(people, await parseFile(filePath + '/' + file))
    }
  } catch (error) {
    console.error(`Error parsing directory:\n${error}`)
  }

  return people
}

const addPeople = (
  people: { [string]: LadokPerson },
  newPeople: Array<LadokPerson>
) => {
  for (let person of newPeople) {
    const ssn = person.ssn

    if (ssn in people) {
      people[ssn].join(person)
    } else {
      people[ssn] = person
    }
  }
}

const checkHeader = (lines: Array<Array<string>>) => {
  const expectedColumns = config.Ladok.File.ExpectedColumns
  const offset = 3
  const columns = lines[offset]
  if (!arrayEquals(columns, expectedColumns)) {
    throw new InvalidFile(
      'Invalid LADOK file, column line not ' +
        `found in expected position. Expected\n    ${String(
          expectedColumns
        )}\nas ` +
        `row ${IGNORE + offset}, got\n    ${String(columns)}.`
    )
  }
}

/**
 * The union name is derived from the parsed file's name.
 */
export const getUnion = (
  fileName: string,
  lines: Array<Array<string>> = []
): string => {
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
