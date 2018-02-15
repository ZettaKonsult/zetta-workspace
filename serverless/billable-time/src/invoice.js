import cuid from 'cuid';
import validator from 'invoice-validator';

import { fetchInvoiceRows } from './invoiceRows';

const getDbTable = () => {
  if (!process.env.InvoicesTable) {
    throw new Error('Could not read database table from env.InvoicesTable');
  }
  return process.env.InvoicesTable;
};

const invoice = ({ recipient, companyCustomerId, invoiceRows }) => ({
  id: cuid(),
  createdAt: Date.now(),
  companyCustomerId,
  recipient,
  invoiceRows,
});

export const createInvoice = async (db, data) => {
  const { companyCustomerId, invoiceRowIds } = data;

  const invoiceRows = await fetchInvoiceRows(
    db,
    companyCustomerId,
    invoiceRowIds
  );

  const isValid = validator(invoiceRows);
  if (!isValid) {
    throw Error('Trying to send invoice row to mixed recipients');
  } else {
    const recipients = await fetchRecipients(db, invoiceRows);

    const invoicePromise = recipients.map(recipient => {
      const params = {
        TableName: getDbTable(),
        Item: invoice({ recipient, companyCustomerId, invoiceRows }),
      };
      return db('put', params);
    });

    await Promise.all(invoicePromise);

    await db('scan', { TableName: getDbTable() });

    return 'Invoice succesfully created';
  }
};

const fetchRecipients = async (db, invoiceRows) => {
  const ids = invoiceRows.reduce(
    (total, row) => [...total, ...row.recipientIds],
    []
  );
  const fetchPromise = ids.map(id =>
    db('get', { TableName: 'Recipients-dev', Key: { id } })
  );
  const result = await Promise.all(fetchPromise);
  return result.map(item => item.Item);
};
