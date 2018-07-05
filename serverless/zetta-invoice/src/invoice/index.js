/* @flow */

/**
 * @date 2017-02-13
 */
import invoice from './invoice';
import invoiceDatabase from './invoiceDynamodb';
import invoiceGroupDatabase from './invoiceGroupDatabase';

import { db } from '../util';
import { getDbTable } from '../util/database';

const TableNameInvoice = getDbTable({ name: 'Invoices' });
const databaseInvoice = invoiceDatabase(db)(TableNameInvoice);

const TableNameInvoiceGroup = getDbTable({ name: 'InvoiceGroups' });
const databaseInvoiceGroup = invoiceGroupDatabase(db)(TableNameInvoiceGroup);

export default {
  create: data => invoice().create(data),
  invoiceDatabase: databaseInvoice,
  databaseInvoiceGroup,
};
