/* @flow */

/**
 * @date 2018-03-10
 */

import type { AWSEvent, AWSContext } from 'types/AWS';

import { failure, success } from '../util';

import adyen from '../vendor/adyen';

export const get = async (event: AWSEvent, context: AWSContext) => {
  try {
    const result = await adyen();
    return success(result);
  } catch (error) {
    console.error(error);
    return failure(error.message);
  }
};
