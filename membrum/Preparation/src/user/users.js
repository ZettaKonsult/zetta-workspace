/* @flow */

/**
 * @date 2018-01-05
 */

import type { UnionPartition, UserData } from '../types';
import { config } from '../config';
import dbLib from 'zk-dynamodb-wrapper';
import passwordGenerator from 'password-generator';

const db = dbLib(config.Region);

const registerUsers = async (users: {
  [string]: UserData,
}): Promise<Array<string>> => {
  let result = [];
  for (const ssn of Object.keys(users)) {
    result.push(await registerUser(users[ssn]));
  }
  return result;
};

const updateUsers = async (users: { [string]: UserData }) => {
  let result = [];
  for (const ssn of Object.keys(users)) {
    result.push(await updateUser(users[ssn]));
  }
  return result;
};

const registerUser = async (user: UserData): Promise<string> => {
  const { ssn, attributes, credits, nation, unionName } = user;

  // try {
  //   await Account.signUp({
  //     userName: ssn,
  //     names: {
  //       project: config.Names.project,
  //       customer: config.Names.customer,
  //     },
  //     attributes: attributes,
  //     password: passwordGenerator(
  //       config.Password.Length,
  //       config.Password.Pattern
  //     ),
  //   });
  // } catch (error) {
  //   console.error(error);
  //   throw error;
  // }

  try {
    await db.create({
      TableName: config.Database.Users.Name,
      Item: {
        ssn: ssn,
        credits: credits,
        nation: nation,
        unionName: unionName,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }

  return ssn;
};

const updateUser = async (user: UserData): Promise<string> => {
  const { ssn, credits, nation, unionName } = user;

  try {
    await db.update({
      TableName: config.Database.Users.Name,
      Key: { ssn: ssn },
      Values: {
        credits: credits,
        nation: nation,
        unionName: unionName,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }

  return ssn;
};

export const saveUnions = async (users: UnionPartition) => {
  let result = {
    registered: [],
    updated: [],
  };

  try {
    result.registered = await registerUsers(users.created);
    console.log(`Done registering new users.`);
  } catch (error) {
    console.error(error);
    throw error;
  }

  try {
    result.updated = await updateUsers(users.modified);
    console.log(`Done updating users with modified unions.`);
  } catch (error) {
    console.error(error);
    throw error;
  }

  return result;
};
