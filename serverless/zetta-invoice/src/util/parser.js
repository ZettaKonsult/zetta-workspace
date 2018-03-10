/* @flow */

/**
 * 2018-02
 */

import type { AWSEvent, ParsedEvent } from 'types/AWS';

export default (event: AWSEvent): ParsedEvent => {
  return {
    data: JSON.parse(event.body || '{}'),
    path: event.requestContext.resourcePath,
    stage: event.requestContext.stage,
    params: event.pathParameters,
    queryParams: event.queryStringParameters,
  };
};
