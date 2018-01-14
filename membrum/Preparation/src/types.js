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

export type LadokPersonJSON = {
  credits: { [string]: string },
  email: string,
  name: string,
  ssn: string
}

export type FileResult = {
  people: Array<LadokPersonJSON>,
  createdAt: number,
  file: string,
  Index: string
}

export type UserData = {
  ssn: string,
  email: string,
  credits: { [string]: string },
  name?: string,
  family_name?: string,
  given_name?: string,
  unionId?: string,
  attributes?: { [string]: string }
}

export type UnionPartition = {
  created: { [string]: UserData },
  decide: { [string]: UserData },
  modified: { [string]: UserData },
  same: { [string]: UserData }
}
