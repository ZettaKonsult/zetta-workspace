import cuid from 'cuid';
import { fetchInvoiceRows } from './invoiceRows';

const getDbTable = () => {
  if (!process.env.InvoicesTable) {
    throw new Error('Could not read database table from env.InvoicesTable');
  }
  return process.env.InvoicesTable;
};

export const invoice = (recipient, invoiceRows) => ({
  id: cuid(),
  createdAt: Date.now(),
  recipient,
  invoiceRows,
});

export const createInvoice = async (db, data) => {
  const { recipientId, invoiceRowIds } = data;

  const recipientPromise = fetchRecipient(db, recipientId);
  const invoiceRowsPromise = fetchInvoiceRows(db, recipientId, invoiceRowIds);

  const [recipient, invoiceRows] = Promise.all([
    recipientPromise,
    invoiceRowsPromise,
  ]);

  const params = {
    TableName: getDbTable(),
    Item: invoice(recipient, invoiceRows),
  };
  await db('put', params);

  return params.Item;
};

const fetchRecipient = async (db, id) =>
  await db('get', { TableName: 'CompanyCustomers', Key: { id } });
