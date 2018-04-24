/* @flow */

/**
 * @date 2018-03-09
 */

import type { AWSEvent, AWSContext, AWSCallback } from 'types/AWS';
import Recipient from '../recipient';

import { parser, db, failure, success } from '../util';

export const create = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  const { companyCustomerId, recipient } = parser(event).data;

  try {
    const result = await Recipient.save({ db, companyCustomerId, recipient });
    callback(null, success(result));
  } catch (error) {
    console.error(error);
    callback(null, failure(error.message));
  }
};

export const get = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  const { companyCustomerId, recipientId } = parser(event).params;

  try {
    const result = await Recipient.get({ db, companyCustomerId, recipientId });
    callback(null, success(result));
  } catch (error) {
    console.error(error);
    callback(null, failure(error.message));
  }
};
