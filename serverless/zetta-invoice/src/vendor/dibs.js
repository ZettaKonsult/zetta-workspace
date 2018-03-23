/* @flow */

/**
 * @date 2018-03-10
 */

import type { DatabaseMethod } from 'types/Database';
import Invoice from '../invoice/invoice';
import AWS from 'aws-sdk';
import queryString from 'query-string';
AWS.config.region = 'eu-west-1';

let lambda = new AWS.Lambda();
const CALLBACK_URL =
  'https://eu-central-1.console.aws.amazon.com/lambda/home?region=eu-central-1#/functions/payment-prod-membrumDIBSConfirm?tab=graph';
const DIBS_URL = 'https://payment.architrade.com/paymentweb/start.action';
const INVOICE_LAMBDA = 'confirmPayment';

const requiredValues = [
  'accepturl',
  'amount',
  'callbackurl',
  'cancelurl',
  'currency',
  'decorator',
  'ip',
  'lang',
  'merchant',
  'orderid',
  'test',
  'uniqueoid',
];

const defaultValues = {
  currency: 'SEK',
  decorator: 'responsive',
  lang: 'sv',
  test: '1',
  uniqueoid: 'yes',
};

const callLambda = function(params: {
  name: string,
  payload: any,
}): { [string]: string } {
  const { payload, name } = params;

  console.log(`Executing lambda function ${name}(${payload});`);
  let args = {
    FunctionName: `${name}`,
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify(payload),
  };

  let result = {};
  lambda.invoke(args, function(error, data) {
    if (error) {
      throw error;
    } else {
      result = data.payload;
    }
  });
  return result;
};

const confirm = async (params: { invoiceId: string }) => {
  const { invoiceId } = params;

  try {
    await callLambda({ name: INVOICE_LAMBDA, payload: invoiceId });
  } catch (error) {
    throw error;
  }
};

export const url = async (params: {
  db: DatabaseMethod,
  accepturl: string,
  cancelurl: string,
  companyCustomerId: string,
  invoiceId: string,
  merchant: string,
}) => {
  const {
    accepturl,
    cancelurl,
    db,
    companyCustomerId,
    invoiceId,
    merchant,
  } = params;

  let form = Object.assign(defaultValues);
  console.log(`Default values set.`);

  try {
    console.log(
      `Fetching invoice ${invoiceId}, customer ${companyCustomerId}.`
    );
    const invoice = await Invoice.get({
      db,
      companyCustomerId,
      invoiceId,
    });

    console.log(invoice);
    if (invoice == null || invoice.id == null) {
      throw new Error(`No such invoice ${invoiceId}!`);
    }
    console.log(`Invoice fetched.`);

    form = {
      ...form,
      accepturl,
      amount: invoice.price,
      callbackurl: CALLBACK_URL,
      cancelurl,
      ip: 'DUMMY-IP',
      merchant,
      orderid: invoice.id,
    };

    console.log(`Constructing URL...`);
    return DIBS_URL + '?' + queryString.stringify(validateForm(form));
  } catch (error) {
    throw error;
  }
};

const validateForm = (params: { [string]: string }): { [string]: string } => {
  for (let key: string of Object.keys(params)) {
    if (requiredValues.indexOf(key) === -1) {
      throw new Error(`Invalid key '${key}'.`);
    }
  }
  for (let key: string of requiredValues) {
    if (!(key in params)) {
      throw new Error(`Missing key '${key}'.`);
    }
    if (params[key] == null) {
      throw new Error(`Missing value for key ${key}.`);
    }
  }

  return params;
};

export default { confirm, url };
