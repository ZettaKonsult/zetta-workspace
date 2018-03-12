/* @flow */

/**
 * @date 2018-03-05
 */

import request from '../util/http';

describe('Lambdas.', () => {
  describe('CompanyCustomers.', () => {
    it('Get.', async () => {
      const expected =
        'https://payment.architrade.com/paymentweb/start.action?accepturl=acceptUrl&amount=123&callbackurl=https%3A%2F%2Feu-central-1.console.aws.amazon.com%2Flambda%2Fhome%3Fregion%3Deu-central-1%23%2Ffunctions%2Fpayment-prod-membrumDIBSConfirm%3Ftab%3Dgraph&cancelurl=cancelUrl&currency=SEK&decorator=responsive&ip=DUMMY-IP&lang=sv&merchant=90234620&orderid=invoiceId1&test=1&uniqueoid=yes';

      const result = await request({
        path: 'dibs/url',
        payload: {
          method: 'POST',
          body: {
            accepturl: 'acceptUrl',
            cancelurl: 'cancelUrl',
            invoiceId: 'invoiceId1',
            merchant: '90234620',
          },
        },
      });
      console.log(result);
      expect(result).toEqual(expected);
    });
  });
});
