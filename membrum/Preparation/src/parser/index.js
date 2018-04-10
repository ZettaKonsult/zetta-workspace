/* @flow */

/**
 * @date 2018-01-16
 */
import type { ParsedUser } from '../types';
import { parseString } from './ladokParser';

export const parseData = async (
  dataString: string,
  fileName: string
): Promise<Array<ParsedUser>> => {
  let people = [];
  try {
    (await parseString(dataString, fileName)).forEach(person =>
      people.push(person.toJSON())
    );
  } catch (error) {
    console.error(`Error while parsing in insertParseResult():\n    ${error}`);
    throw error;
  }
  return (people: Array<ParsedUser>);
};

export default parseData;
