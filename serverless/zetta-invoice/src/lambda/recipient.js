/* @flow */

/**
 * @date 2018-03-09
 */

import type { AWSEvent, AWSContext, AWSCallback } from 'types/AWS';
import Recipient from '../recipient/';

import { success, failure } from '../util/response';
import parser from '../util/parser';
import db from '../util/database';

export const create = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  const { recipient } = parser(event).data;

  try {
    const result = await Recipient.create({ db, recipient });
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
  const { companyCustomerId } = parser(event).params;

  try {
    const result = await Recipient.list({ db, companyCustomerId });
    callback(null, success(result));
  } catch (error) {
    console.error(error);
    callback(null, failure(error.message));
  }
};
