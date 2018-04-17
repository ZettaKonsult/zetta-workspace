/* @flow */

/**
 * @date  2017-11-07
 */

import db, { getDbTable } from '../util/database';

import * as unionAssigner from './unionAssigner';

const RESULTS_TABLE = getDbTable({ name: 'LadokParseResults' });
const USERS_TABLE = getDbTable({ name: 'Recipients' });
const UnionMapping = {
  EHL: ['Lunda Ekonomerna'],
  HT: ['Humanistiska och Teologiska Studentkåren'],
  JUR: ['Juridiska Föreningen'],
  KO: ['Studentkåren vid Konstnärliga fakulteten i Malmö'],
  LTH: ['Teknologkåren'],
  MED: ['Corpus Medicus'],
  NAT: ['Lunds Naturvetarkår'],
  SAM: ['Samhällsvetarkåren'],
  USV: ['LundaEkonomerna', 'Lunds Naturvetarkår', 'Samhällsvetarkåren'],
};

export const getAssignments = async () => {
  try {
    console.log(`Fetching LADOK parse results.`);
    const parseResult = await getParseResults();
    const aggregated = unionAssigner.aggregateResults(parseResult);
    const faculties = unionAssigner.getFaculties(aggregated);
    const newAssignments = unionAssigner.getUnions(UnionMapping, faculties);
    const users = await buildUserMap(aggregated);

    return unionAssigner.getUpdatedUnions({
      assignments: newAssignments,
      users,
    });
  } catch (error) {
    throw error;
  }
};

const buildUserMap = async aggregated => {
  const promises = Object.keys(aggregated).map(ssn => getUser({ ssn }));
  const users = await Promise.all(promises);

  return users.reduce((total, user, index) => {
    const ssn = Object.keys(aggregated)[index];
    if (user !== undefined) {
      console.log(`user existed.`);
      return { ...total, [ssn]: user };
    } else {
      console.log(`No user . A new one will be created.`);
      return { ...total, [ssn]: aggregated[ssn] };
    }
  }, {});
};

const getParseResults = async () => {
  const result = await db('scan', {
    TableName: RESULTS_TABLE,
  });
  return result.Items;
};

const getUser = async ({ ssn }: { ssn: string }): Promise<Object> => {
  const result = await db('query', {
    TableName: USERS_TABLE,
    IndexName: 'ssn',
    KeyConditionExpression: '#ssn = :ssn',
    ExpressionAttributeNames: {
      '#ssn': 'ssn',
    },
    ExpressionAttributeValues: {
      ':ssn': ssn,
    },
  });
  return result.Items[0];
};
