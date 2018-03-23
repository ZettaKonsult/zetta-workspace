/* @flow */

/**
 * @date 2018-03-13
 */

import type { AWSEvent, AWSContext } from 'types/AWS';

import db from '../util/database';
import parser from '../util/parser';
import { failure, success } from '../util/response';
import planNextPaymentProcess from '../plans/process';

export const main = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  try {
    let result;

    if (process.env.IS_OFFLINE) {
      const { epoch } = parser(event).params;
      result = await planNextPaymentProcess({ db, epoch });
    } else {
      result = await planNextPaymentProcess({ db, epoch: Date.now() });
    }

    callback(null, success(result));
  } catch (error) {
    console.error(error.message);
    callback(null, failure(error.message));
  }
};
