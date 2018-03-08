/* @flow */

/**
 * @date 2018-03-08
 */

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
  succeed: () => boolean,
  fail: () => boolean,
  done: () => boolean,
  getRemainingTimeInMillis: () => number,
};

export type AWSEvent = {
  Records: any,
  names: Array<string>,
};

export type parsedEvent = {
  data: string,
  path: string,
  stage: string,
  params: { [string]: string },
  queryParams: { [string]: string },
};
