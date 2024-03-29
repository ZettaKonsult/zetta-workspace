/* @flow */

/**
 * @date 2018-03-13
 */

import type { AWSEvent, AWSContext } from 'types/AWS';

import { parser, db, failure, success } from '../util';
import planNextPaymentProcess from '../plans/process';

export const main = async (event: AWSEvent, context: AWSContext) => {
  try {
    let result;

    if (process.env.IS_OFFLINE) {
      const { epoch } = parser(event).params;
      result = await planNextPaymentProcess({ db, epoch: Number(epoch) });
    } else {
      result = await planNextPaymentProcess({ db, epoch: Date.now() });
    }

    return success(result);
  } catch (error) {
    console.error(error.message);
    return failure(error.message);
  }
};
