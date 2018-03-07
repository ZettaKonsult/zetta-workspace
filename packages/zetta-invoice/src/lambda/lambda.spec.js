/* @flow */

/**
 * @date 2018-03-05
 */

import testUtil from '../../test/util';
import { create, setStatus } from './invoice';

const event = {};
const awsCallback = () => {};

if (!process.env.IS_OFFLINE) {
  throw new Error(
    'Database mode must be set to offline in order to run lambda tests.'
  );
}

describe('Lambdas.', () => {
  describe('Invoice.', () => {
    it('Creation.', async () => {
      const id = await create(
        {
          body: JSON.stringify({ recipientId: 'aaa', rowIds: ['a', 'b', 'c'] }),
          requestContext: {},
        },
        event,
        awsCallback
      );

      const result = await testUtil.tableGet({
        table: 'Invoices',
        key: { id },
      });
      expect(result).toEqual({ id });
    });
  });

  describe('Invoice status.', async () => {
    describe('Set.', async () => {
      const id = await setStatus(
        {
          body: JSON.stringify({ invoiceId: 'ccc', newStatus: 'succeeded' }),
          requestContext: {},
        },
        event,
        awsCallback
      );

      const result = await testUtil.tableGet({
        table: 'InvoiceStatuses',
        key: { id },
      });
      expect(result).toEqual({ id });
    });
  });
});
