/* @flow */

/**
 * @date  2017-11-07
 */

import type { AWSCallback } from '../types';
import * as unionAssigner from '../assigner';
import AWS from 'aws-sdk';
import { config } from '../config';

AWS.config.update({ region: 'eu-central-1' });
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const getAssignments = async (callback: AWSCallback) => {
  console.log(`Fetching LADOK parse results.`);

  let parseResult = {};
  try {
    parseResult = await unionAssigner.aggregateResults(await getParseResults());
  } catch (error) {
    callback(error);
  }
  console.log(`Fetched LADOK parse results from database.`);

  const faculties = unionAssigner.getFaculties(parseResult);
  console.log(`Assigned faculties to each user.`);

  const newAssignments = unionAssigner.getUnions(
    config.TRF.UnionMapping,
    faculties
  );

  let users = {};
  try {
    users = await getUsers();
  } catch (error) {
    callback(error);
  }
  console.log(`Fetched user data from database.`);

  for (const ssn of Object.keys(parseResult)) {
    if (!(ssn in users)) {
      users[ssn] = parseResult[ssn];
    }
  }

  return unionAssigner.getUpdatedUnions({
    NewAssignments: newAssignments,
    Users: users,
  });
};

const getParseResults = async () =>
  (await dynamoDB
    .scan({
      TableName: 'LadokParseResult',
    })
    .promise()).Items;

const getUsers = async () =>
  (await dynamoDB
    .scan({
      TableName: 'MembrumUsers',
    })
    .promise()).Items;
