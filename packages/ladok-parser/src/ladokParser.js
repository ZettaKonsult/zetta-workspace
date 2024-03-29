/* @flow */

/**
 * @date  2017-08-22
 */

import * as path from 'path';
import { listFiles } from 'common-js-utils';
import { parseCSVFile, parseCSVLines } from 'zk-csv-parser';
import { LadokPerson } from './ladokPerson';

// To do: find (or make) one that does not necessitate requires.
const arrayEquals = require('array-equal');

const IGNORE = 8;
const expectedColumns = [
  'Pnr',
  'Namn',
  'Epostadress',
  'Registrerade po�ng',
  '',
];

export class InvalidFile extends Error {}

export const parseFile = async (
  filePath: string
): Promise<Array<LadokPerson>> => {
  return aggregatePeople(
    await parseCSVFile(filePath, { delimiter: ';', skipFirst: IGNORE }),
    path.basename(filePath)
  );
};

export const parseString = async (
  stringData: string,
  filePath: string
): Promise<Array<LadokPerson>> => {
  let result = [];
  try {
    result = await parseCSVLines(stringData.split(/[ \t]*[\r]?\n[ \t]*/), {
      delimiter: ';',
      skipFirst: IGNORE,
    });
  } catch (error) {
    console.error(`Error while parsing raw data:\n${error}`);
  }
  return aggregatePeople(result, path.basename(filePath));
};

const aggregatePeople = (
  lines: Array<Array<string>>,
  fileName: string
): Array<LadokPerson> => {
  checkHeader(lines);
  const unionName = getUnion(fileName, lines);

  return lines
    .slice(4, lines.length)
    .filter(element => element.length > 3)
    .map(
      line => new LadokPerson(line[0], line[1], line[2], line[3], unionName)
    );
};

export const parseDirectory = async (
  filePath: string
): { [string]: LadokPerson } => {
  try {
    const { files } = await listFiles(filePath);
    let parsedFiles = files.map(file => parseFile(filePath + '/' + file));
    parsedFiles = await Promise.all(parsedFiles);
    return parsedFiles.reduce((total, file) => addPeople(total, file), {});
  } catch (error) {
    console.error(`Error parsing directory:\n${error}`);
  }
};

const addPeople = (
  people: { [string]: LadokPerson },
  newPeople: Array<LadokPerson>
) =>
  newPeople.reduce((total, person) => {
    const ssn = person.ssn;
    if (ssn in total) {
      total[ssn].join(person);
    } else {
      total[ssn] = person;
    }
    return total;
  }, people);

const checkHeader = (lines: Array<Array<string>>) => {
  const offset = 3;
  const columns = lines[offset];
  if (!arrayEquals(columns, expectedColumns)) {
    throw new InvalidFile(
      'Invalid LADOK file, column line not ' +
        `found in expected position. Expected\n    ${String(
          expectedColumns
        )}\nas ` +
        `row ${IGNORE + offset}, got\n    ${String(columns)}.`
    );
  }
};

/**
 * The union name is derived from the parsed file's name.
 */
export const getUnion = (
  fileName: string,
  lines: Array<Array<string>> = []
): string => {
  let parts = fileName.split('.')[0].split(/TRF_[H|V]\d\d_/);
  if (parts.length === 2) {
    return parts[1];
  }
  parts = lines[0][0].split('Lokal klass:');
  if (parts.length === 2) {
    return parts[1].trim();
  }
  throw new InvalidFile(
    `Invalid LADOK file '${fileName}', ` + `could not determine union.`
  );
};
