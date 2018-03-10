/* @flow */

/**
 * @date 2018-03-10
 */

import type { AWSContext, AWSEvent, AWSCallback } from 'types/AWS';
import AWS from 'aws-sdk';
import parser from '../../../../packages/serverless-event-parser/src/';
import { success, failure } from '../util/response';
AWS.config.region = 'eu-west-1';

let lambda = new AWS.Lambda();
const INVOICE_LAMBDA = 'confirmPayment';

const callLambda = function(params: {
  name: string,
  event: AWSEvent,
  context: AWSContext,
  payload: any,
}) {
  const { payload, name } = params;

  console.log(`Executing lambda function ${name}(${payload});`);
  let args = {
    FunctionName: `${name}`,
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify(payload),
  };

  lambda.invoke(args, function(error, data) {
    if (error) {
      throw error;
    } else {
      return data.payload;
    }
  });
};

const confirm = async (params: { invoiceId: string }) => {
  const { invoiceId } = params;

  try {
    await callLambda({ name: INVOICE_LAMBDA, payload: invoiceId });
  } catch (error) {
    throw error;
  }
};

export const url = async (
  event: AWSEvent,
  context: AWSContext,
  callback: AWSCallback
) => {
  const { invoiceId } = parser(event).data;

  try {
    const result = 'theUrl' + invoiceId;
    callback(null, success(result));
  } catch (err) {
    console.error(err);
    callback(null, failure(err.message));
  }
};

export default { confirm, url };
