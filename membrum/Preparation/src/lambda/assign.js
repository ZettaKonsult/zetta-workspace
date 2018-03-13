/* @flow */

/**
 * @date  2017-11-07
 */

import db, { getDbTable } from '../util/database';
import * as unionAssigner from '../assigner';
import { config } from '../config';

const RESULTS_TABLE = getDbTable({ name: 'LadokParseResults' });
const USERS_TABLE = getDbTable({ name: 'Recipients' });

export const getAssignments = async () => {
  console.log(`Fetching LADOK parse results.`);

  let parseResult = {};
  try {
    parseResult = await getParseResults();
  } catch (error) {
    console.error(error);
    throw error;
  }
  console.log(`Aggregating results.`);
  const aggregated = await unionAssigner.aggregateResults(parseResult);

  const faculties = unionAssigner.getFaculties(aggregated);
  console.log(faculties);

  let newAssignments = {};
  try {
    newAssignments = unionAssigner.getUnions(
      config.TRF.UnionMapping,
      faculties
    );
  } catch (error) {
    console.log(error);
    throw error;
  }

  let users = {};
  for (const ssn of Object.keys(aggregated)) {
    const user = await getUser({ ssn });
    if (user == null) {
      users[ssn] = aggregated[ssn];
    } else {
      users[ssn] = user;
    }
  }

  try {
    return unionAssigner.getUpdatedUnions({
      assignments: newAssignments,
      users,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getParseResults = async () =>
  (await db('scan', {
    TableName: RESULTS_TABLE,
  })).Items;

const getUser = async (params: { ssn: string }): Promise<{ [string]: any }> => {
  const { ssn } = params;

  console.log(`Fetching user with SSN ${ssn}.`);

  try {
    return (await db('query', {
      TableName: USERS_TABLE,
      IndexName: 'ssn',
      KeyConditionExpression: '#ssn = :ssn',
      ExpressionAttributeNames: {
        '#ssn': 'ssn',
      },
      ExpressionAttributeValues: {
        ':ssn': ssn,
      },
    })).Items[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
