/* @flow */

/**
 * @date 2018-03-10
 */

import type { AWSEvent, AWSContext, AWSCallback } from 'types/AWS';
import Dibs from '../vendor/dibs';

import { success, failure } from '../util/response';
import parser from '../util/parser';
import db from '../util/database';
import queryString from 'query-string';

export const confirm = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  const { parsed } = parser(event).data;
  const invoiceId = queryString.parse(parsed);
  console.log(`Received callback for invoice ${invoiceId}.`);

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
  const { companyCustomerId, invoiceId } = data;
  console.log(
    `Received DIBS url request for invoice ${invoiceId}, customer ${companyCustomerId}.`
  );

  try {
    const dibsUrl = await Dibs.url({ db, ...data });
    callback(null, success(dibsUrl));
  } catch (error) {
    console.error(error);
    callback(null, failure(error.message));
  }
};
