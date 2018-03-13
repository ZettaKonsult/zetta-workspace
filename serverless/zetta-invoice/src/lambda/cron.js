/* @flow */

/**
 * @date 2018-03-13
 */

import type { AWSEvent, AWSContext, AWSCallback } from 'types/AWS';

import { success, failure } from '../util/response';
import parser from '../util/parser';
import db from '../util/database';
import { getPlansToPay, getAllPlansToProcess } from '../plans/list';

export const main = async (event, context) => {
  const time = new Date();
  console.log(`Your cron function "${context.functionName}" ran at ${time}`);
  try {
    const result = await getAllPlansToProcess({ db });
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
};
