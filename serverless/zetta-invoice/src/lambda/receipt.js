/* @flow */

/**
 * @date 2018-03-10
 */

import type { AWSEvent, AWSContext, AWSCallback } from 'types/AWS';
import * as Receipt from '../receipt/receipt';
import db from '../util/database';
import { getTable } from '../util/config';
import parser from '../../../../packages/serverless-event-parser/src/';

const TABLE_NAME = 'Receipts';

export const create = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  const { invoice } = parser(event).data;

  try {
    const receipt = await Receipt.create({ invoice });
    await db('create', {
      TableName: getTable({ name: TABLE_NAME }),
      Item: receipt,
    });
  } catch (error) {
    console.error(error);
    callback(error);
  }
};
