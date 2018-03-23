/* @flow */

/**
 * @date 2018-03-13
 */

import type { AWSEvent, AWSContext } from 'types/AWS';

import db from '../util/database';

import planPaymentProcess from '../plans/process';

export const main = async (event: AWSEvent, context: AWSContext) => {
  const time = new Date();
  console.log(
    `Your cron function "${context.functionName}" ran at ${time.toISOString()}.`
  );
  try {
    await planPaymentProcess({ db });
  } catch (error) {
    console.error(error.message);
  }
};
