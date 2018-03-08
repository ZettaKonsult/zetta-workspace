/* @flow */

/**
 * 2018-02
 */

import type { AWSEvent } from 'types/AWS';

export default (event: AWSEvent): ParsedEvent => {
  return {
    data: JSON.parse(event.body || '{}'),
    path: event.requestContext.resourcePath,
    stage: event.requestContext.stage,
    params: event.pathParameters,
    queryParams: event.queryStringParameters,
  };
};
