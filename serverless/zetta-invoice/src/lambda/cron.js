/* @flow */

/**
 * @date 2018-03-13
 */

import type { AWSEvent, AWSContext, AWSCallback } from 'types/AWS';

import { success, failure } from '../util/response';
import parser from '../util/parser';
import db from '../util/database';

import planPaymentProcess from '../plans/process';

export const main = async (event, context, callback) => {
  const time = new Date();
  console.log(`Your cron function "${context.functionName}" ran at ${time}`);
  try {
    const result = await planPaymentProcess({ db });
    callback(null, success(result));
  } catch (error) {
    console.error(error.message);
    callback(null, failure(error.message));
  }
};
