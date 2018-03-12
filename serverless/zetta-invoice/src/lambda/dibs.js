/* @flow */

/**
 * @date 2018-03-10
 */

import type { AWSEvent, AWSContext, AWSCallback } from 'types/AWS';
import Dibs from '../vendor/dibs';

import { success, failure } from '../util/response';
import parser from '../util/parser';
import db from '../util/database';

export const confirm = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  const { invoiceId } = parser(event).data;

  try {
    const result = await Dibs.confirm({ db, invoiceId });
    callback(null, success(result));
  } catch (error) {
    console.error(error);
    callback(null, failure(error.message));
  }
};

export const url = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  const data = parser(event).data;

  try {
    const dibsUrl = await Dibs.url({ db, ...data });
    callback(null, success(dibsUrl));
  } catch (error) {
    console.error(error);
    callback(null, failure(error.message));
  }
};

export default { confirm, url };
