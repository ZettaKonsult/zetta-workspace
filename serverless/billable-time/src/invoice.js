import cuid from 'cuid';
import { billableRows } from './billableRow';

if (!process.env.InvoiceTable) {
  throw new Error('Could not read database table from env.InvoiceTable');
}
const invoiceTable = process.env.InvoiceTable;

export const invoice = (recipient, invoiceRows) => ({
  id: cuid(),
  createdAt: Date.now(),
  recipient,
  invoiceRows,
});

export const createInvoice = async (db, data) => {
  const { recipientId, invoiceRowIds } = data;

  const recipientPromise = fetchRecipient(db, recipientId);
  const invoiceRowsPromise = billableRows(db, recipientId, invoiceRowIds);

  const [recipient, invoiceRows] = Promise.all([
    recipientPromise,
    invoiceRowsPromise,
  ]);

  const params = {
    TableName: invoiceTable,
    Item: invoice(recipient, invoiceRows),
  };
  await db('put', params);

  return params.Item;
};

const fetchRecipient = async (db, id) =>
  await db('get', { TableName: 'CompanyCustomers', Key: { id } });
