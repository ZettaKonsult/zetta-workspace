/* @flow */

/**
 * @date 2018-03-12
 */

import type { AWSEvent, AWSContext } from 'types/AWS';

import { parser, db, failure, success } from '../util';

import plans from '../plans/';

export const get = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomerId } = parser(event).params;

  try {
    const result = await plans.list({ db, companyCustomerId });
    return success(result);
  } catch (error) {
    console.error(error);
    return failure(error.message);
  }
};

export const addRecipientToPlan = async (
  event: AWSEvent,
  context: AWSContext
) => {
  const { companyCustomerId, recipientId, planId } = parser(event).data;

  try {
    const result = await plans.updateRecipientIds({
      db,
      companyCustomerId,
      recipientId,
      planId,
    });
    return success(result);
  } catch (error) {
    console.error(error);
    return failure(error.message);
  }
};

export const save = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomerId, plan } = parser(event).data;

  try {
    const result = await plans.save({ db, companyCustomerId, plan });
    return success(result);
  } catch (error) {
    console.error(error);
    return failure(error.message);
  }
};

export const remove = async (event: AWSEvent, context: AWSContext) => {
  const { companyCustomerId, planId } = parser(event).data;

  try {
    const result = await plans.remove({ db, companyCustomerId, planId });
    return success(result);
  } catch (error) {
    console.error(error);
    return failure(error.message);
  }
};
