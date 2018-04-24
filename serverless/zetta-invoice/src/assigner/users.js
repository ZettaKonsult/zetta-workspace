/* @flow */

/**
 * @date 2018-01-05
 */

import type { UnionPartition, UserData } from '../types';

import db, { getDbTable } from '../util/database';

const TableName = getDbTable({ name: 'MembrumUsers' });

export const saveUnions = async (users: UnionPartition) => {
  try {
    let registered = await registerUsers(users.created);
    console.log(`Done registering new users.`);
    let updated = await updateUsers(users.modified);
    console.log(`Done updating users with modified unions.`);
    return {
      registered,
      updated,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const registerUsers = async (users: {
  [string]: UserData,
}): Promise<Array<string>> => {
  let promises = Object.values(users).map(user => registerUser(user));
  return await Promise.all(promises);
};

const updateUsers = async (users: { [string]: UserData }) => {
  let promises = Object.values(users).map(user => updateUser(user));
  return await Promise.all(promises);
};

const registerUser = async (user: UserData): Promise<string> => {
  const { ssn, attributes, credits, nation, unionName } = user;

  try {
    await db('create', {
      TableName,
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
    await db('update', {
      TableName,
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
