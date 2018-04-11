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
  try {
    const parseResult = await parseString(dataString, fileName);
    return parseResult.map(person => person.toJSON());
  } catch (error) {
    console.error(`Error while parsing in insertParseResult():\n    ${error}`);
    throw error;
  }
};

export default parseData;
