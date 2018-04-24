/* @flow */

/**
 * @date 2018-03-10
 */

import type { AWSEvent, AWSContext, AWSCallback } from 'types/AWS';
import Customer from '../invoice/customer';

import { parser, db, failure, success } from '../util';

export const get = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  try {
    const { companyCustomerId } = parser(event).data;
    const result = await Customer.get({ db, companyCustomerId });
    callback(null, success(result));
  } catch (error) {
    console.error(error);
    callback(null, failure(error.message));
  }
};
