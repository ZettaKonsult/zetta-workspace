/* @flow */

/**
 * @date 2017-02-13
 */
import invoice from './invoice';
import invoiceDatabase from './invoiceDynamodb';

import { db } from '../util';
import { getDbTable } from '../util/database';

const TableName = getDbTable({ name: 'Invoices' });
const database = invoiceDatabase(db)(TableName);

export default {
  create: data => invoice().create(data),
  invoiceDatabase: database,
};
