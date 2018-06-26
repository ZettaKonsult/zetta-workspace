/* @flow */

/**
 * @date 2017-02-13
 */
import invoice from './invoice';
import invoiceDatabase from './invoiceDynamodb';

export default {
  create: data => invoice().create(data),
  invoiceDatabase,
};
