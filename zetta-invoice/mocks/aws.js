/* @flow */

/**
 * @date 2018-03-11
 */

import type { AWSEvent, AWSContext, AWSCallback } from 'types/AWS';

const lambdaCall = async (params: { method: any, body: any }) => {
  const { body, method } = params;
  const aws = await inputs({ body });

  let x;
  await method(aws.event, aws.context, (error, data) => {
    x = data;
  });
  return x;
};

const inputs = async (params: {
  body: any,
}): Promise<{
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback,
}> => ({
  event: {
    body: JSON.stringify(params.body),
    Records: {},
    names: [],
    pathParameters: {},
    queryStringParameters: [],
    requestContext: {
      stage: '',
      resourcePath: '',
    },
  },
  context: {
    awsRequestId: '',
    invokeid: '',
    logGroupName: '',
    logStreamName: '',
    functionVersion: '',
    isDefaultFunctionVersion: false,
    functionName: '',
    memoryLimitInMB: '',
    succeed: () => false,
    fail: () => false,
    done: () => false,
    getRemainingTimeInMillis: () => 0,
  },
  callback: () => {},
});

export default { inputs, lambdaCall };
