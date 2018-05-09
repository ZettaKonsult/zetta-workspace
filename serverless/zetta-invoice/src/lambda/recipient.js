/* @flow */

/**
 * @date 2018-03-09
 */

import type { AWSEvent, AWSContext } from 'types/AWS';
import Recipient from '../recipient';

import { parser, db, failure, success } from '../util';

export const create = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomerId, recipient } = parser(event).data;

  try {
    const result = await Recipient.save({ db, companyCustomerId, recipient });
    return success(result);
  } catch (error) {
    console.error(error);
    return failure(error.message);
  }
};

export const get = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomerId, recipientId } = parser(event).params;

  try {
    const result = await Recipient.get({ db, companyCustomerId, recipientId });
    return success(result);
  } catch (error) {
    console.error(error);
    return failure(error.message);
  }
};

export const remove = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomerId, recipientId } = parser(event).data;

  try {
    const result = await Recipient.remove({
      db,
      companyCustomerId,
      recipientId,
    });
    return success(result);
  } catch (error) {
    console.error(error);
    return failure(error.message);
  }
};
