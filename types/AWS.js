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
  body: string,
  Records: any,
  names: Array<string>,
  pathParameters: any,
  queryStringParameters: Array<string>,
  requestContext: {
    stage: string,
    resourcePath: string,
  },
};

export type ParsedEvent = {
  data: any,
  path: string,
  stage: string,
  params: { [string]: string },
  queryParams: { [string]: string },
};
