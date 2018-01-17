/* @flow */

/**
 * @date 2018-01-03
 */

export type AttributeData = {
  birthdate: string,
  given_name: string,
  family_name: string,
  email: string
}

export type NameTuple = { family_name: string, given_name: string }

type UserDataBase = {
  ssn: string,
  email: string,
  credits: { [string]: string }
}

export type UserData = UserDataBase & {
  name: string,
  nation?: string,
  unionName?: string | [string]
}

export type UserDataWithAttributes = UserDataBase & {
  attributes: { [string]: string }
}

export type UserDataWithNames = UserDataBase & {
  family_name: string,
  given_name: string
}

export type FileResult = {
  people: Array<UserData>,
  createdAt: number,
  file: string,
  Index: string
}

export type UnionPartition = {
  created: { [string]: UserData },
  modified: { [string]: UserData },
  same: { [string]: UserData }
}

export type AWSCallback = (error: any, data?: any) => mixed

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
  getRemainingTimeInMillis: () => mixed
}

export type AWSEvent = {
  Records: any,
  names: any
}
