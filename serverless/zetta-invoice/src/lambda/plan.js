/* @flow */

/**
 * @date 2018-02
 */

import type { AWSContext, AWSCallback, AWSEvent } from 'types/AWS';
import Plan from '../plans';
import db, { getDbTable } from '../util/database';
import { failure, success } from '../util/response';
import parser from '../../../../packages/serverless-event-parser/src/';

const INVOICE_TABLE = 'Invoices';
const PLAN_TABLE = 'Plans';

export const create = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  const { data } = parser(event);

  try {
    const plan = await Plan.create({ ...data });
    await db('create', {
      TableName: getDbTable({ name: PLAN_TABLE }),
      Item: plan,
    });
    callback(null, success(plan));
  } catch (error) {
    console.error(error);
    callback(null, failure(error));
  }
};

export const createInvoice = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  const { data } = parser(event);
  const { planId, recipientId } = data;

  try {
    const invoice = await Plan.createInvoice({ planId, recipientId });
    await db('create', {
      TableName: getDbTable({ name: INVOICE_TABLE }),
      Item: invoice,
    });
    callback(null, success(invoice));
  } catch (error) {
    console.error(error);
    callback(null, failure(error));
  }
};
