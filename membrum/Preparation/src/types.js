/* @flow */

/**
 * @date 2018-01-03
 */

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
