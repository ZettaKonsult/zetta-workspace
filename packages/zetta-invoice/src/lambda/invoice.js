/* @flow */

/**
 * @date  2017-12-
 */

import type { AWSCallback } from '../types';
import AWS from 'aws-sdk';
import db from 'zk-dynamodb-wrapper';
import * as Invoice from '../invoice/invoice';

AWS.config.update({ region: 'eu-central-1' });

export const invoice = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  const { customer, rowIds } = event;

  try {
    let invoiceIds = [];
    rowIds.forEach(async rowId => {
      const invoice = Invoice.generate({ customer, rowId });
      await db.put(invoice);
      invoiceIds.push(invoice.id);
    });
    callback(null, invoiceIds);
  } catch (error) {
    callback(error);
  }
};
