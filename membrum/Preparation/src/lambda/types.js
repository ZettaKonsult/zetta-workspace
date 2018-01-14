/* @flow */

/**
 * @date 2018-01-04
 */

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
