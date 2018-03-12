/* @flow */

/**
 * @date 2018-03-12
 */

import type { AWSEvent, AWSContext, AWSCallback } from 'types/AWS';

import { success, failure } from '../util/response';
import parser from '../util/parser';
import db from '../util/database';
import plans from '../plans/';

export const get = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  const { companyCustomerId } = parser(event).params;

  try {
    const result = await plans.list({ db, companyCustomerId });
    callback(null, success(result));
  } catch (error) {
    console.error(error);
    callback(null, failure(error.message));
  }
};
