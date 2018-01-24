/* @flow */

/**
 * @date  2018-01-15
 */

import type { AWSCallback, AWSContext, AWSEvent } from '../types';
import AWS from 'aws-sdk';
import { getAssignments } from './assign';

AWS.config.update({ region: 'eu-central-1' });

export const getNewAssignments = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => callback(null, await getAssignments(callback));
