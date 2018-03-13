/* @flow */

/**
 * @date 2018-01-03
 */

export type AttributeData = {
  birthdate: string,
  given_name: string,
  family_name: string,
  email: string,
};

export type NameTuple = { family_name: string, given_name: string };

type UserDataBase = {
  ssn: string,
  credits: { [string]: string },
};

export type ParsedUser = UserDataBase & {
  email: string,
  name: string,
};

export type UserData = UserDataBase & {
  nation?: string,
  unionName?: string | [string],
  attributes: AttributeData,
};

export type FileResult = {
  people: Array<ParsedUser>,
  createdAt: number,
  file: string,
  id: string,
};

export type UnionPartition = {
  created: { [string]: UserData },
  modified: { [string]: UserData },
  same: { [string]: UserData },
};
