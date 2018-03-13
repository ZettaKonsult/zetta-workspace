/* @flow */

/**
 * @date  2018-01-15
 */

import type { AWSCallback, AWSContext, AWSEvent } from 'types/AWS';
import { failure, success } from '../util/response';
import AWS from 'aws-sdk';
import { getAssignments } from './assign';

AWS.config.update({ region: 'eu-central-1' });

export const getNewAssignments = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  try {
    callback(null, success(await getAssignments(callback)));
  } catch (error) {
    console.error(error);
    callback(null, failure(error.message));
  }
};
