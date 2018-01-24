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
  Index: string,
};

export type UnionPartition = {
  created: { [string]: UserData },
  modified: { [string]: UserData },
  same: { [string]: UserData },
};

export type AWSCallback = (error: any, data?: any) => mixed;

export type AWSContext = {
  awsRequestId: string,
  invokeid: string,
  logGroupName: string,
  logStreamName: string,
  functionVersion: string,
  isDefaultFunctionVersion: boolean,
  functionName: string,
  memoryLimitInMB: string,
  succeed: () => mixed,
  fail: () => mixed,
  done: () => mixed,
  getRemainingTimeInMillis: () => mixed,
};

export type AWSEvent = {
  Records: any,
  names: any,
};
