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

export const addRecipientToPlan = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  const { companyCustomerId, recipientId, planId } = parser(event).data;

  try {
    const result = await plans.updateRecipientIds({
      db,
      companyCustomerId,
      recipientId,
      planId,
    });
    callback(null, success(result));
  } catch (error) {
    console.error(error);
    callback(null, failure(error.message));
  }
};

export const save = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  const { companyCustomerId, plan } = parser(event).data;

  try {
    const result = await plans.save({ db, companyCustomerId, plan });
    callback(null, success(result));
  } catch (error) {
    console.error(error);
    callback(null, failure(error.message));
  }
};

export const remove = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  const { companyCustomerId, planId } = parser(event).data;

  try {
    const result = await plans.remove({ db, companyCustomerId, planId });
    callback(null, success(result));
  } catch (error) {
    console.error(error);
    callback(null, failure(error.message));
  }
};
