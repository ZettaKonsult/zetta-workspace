/* @flow */

/**
 * @date 2018-03-05
 */

import type { AWSEvent, AWSContext, AWSCallback } from 'types/AWS';

import awsMock from '../../test/mocks/aws';
import config from '../util/config';
import fetch from 'isomorphic-fetch';

import Dibs from '../lambda/dibs';

if (!process.env.IS_OFFLINE) {
  throw new Error(
    'Database mode must be set to offline in order to run lambda tests.'
  );
}

const PORT = config.port;
const HOST = `http://localhost:${PORT}`;

export const getRequest = async (params: { path: string }): any => {
  return await fetch(`${HOST}/${params.path}`);
};

describe('Lambdas.', () => {
  describe('CompanyCustomers.', () => {
    it('Get.', async () => {
      const expected = {
        body:
          'https://payment.architrade.com/paymentweb/start.action?accepturl=acceptUrl&amount=123&callbackurl=https%3A%2F%2Feu-central-1.console.aws.amazon.com%2Flambda%2Fhome%3Fregion%3Deu-central-1%23%2Ffunctions%2Fpayment-prod-membrumDIBSConfirm%3Ftab%3Dgraph&cancelurl=cancelUrl&currency=SEK&decorator=responsive&ip=DUMMY-IP&lang=sv&merchant=90234620&orderid=invoiceId1&test=1&uniqueoid=yes"',
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        statusCode: 200,
      };
      const value = await awsMock.lambdaCall({
        method: Dibs.url,
        body: {
          accepturl: 'acceptUrl',
          cancelurl: 'cancelUrl',
          invoiceId: 'invoiceId1',
          merchant: '90234620',
        },
      });
      expect(value).toEqual(expected);
    });
  });
});
