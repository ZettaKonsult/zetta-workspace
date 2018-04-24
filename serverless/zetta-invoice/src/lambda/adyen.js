/* @flow */

/**
 * @date 2018-03-10
 */

import type { AWSEvent, AWSContext, AWSCallback } from 'types/AWS';

import { failure, success } from '../util';

import adyen from '../vendor/adyen';

export const get = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  try {
    const result = await adyen();
    callback(null, success(result));
  } catch (error) {
    console.error(error);
    callback(null, failure(error.message));
  }
};
