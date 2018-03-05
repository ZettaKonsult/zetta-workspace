import cuid from 'cuid';
import validator from 'invoice-validator';

import { fetchInvoiceRows } from './invoiceRows';
import recipientDb from './recipient';

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
    const recipients = await fetchUniqueRecipients(
      db,
      companyCustomerId,
      invoiceRows
    );

    const invoicePromise = recipients.map(recipient => {
      const params = {
        TableName: getDbTable(),
        Item: invoice({ recipient, companyCustomerId, invoiceRows }),
      };
      return db('put', params);
    });

    await Promise.all(invoicePromise);

    return 'Invoice succesfully created';
  }
};

const fetchUniqueRecipients = async (db, companyCustomerId, invoiceRows) => {
  const ids = invoiceRows.reduce(
    (total, row) => [...total, ...row.recipientIds],
    []
  );
  const uniqueIds = ids.filter(
    (id, index, array) => array.indexOf(id) === index
  );
  const fetchPromise = uniqueIds.map(id =>
    recipientDb.get(db, companyCustomerId, id)
  );
  return await Promise.all(fetchPromise);
};

const list = async (db, companyCustomerId) => {
  const result = await db('query', {
    TableName: getDbTable(),
    KeyConditionExpression: 'companyCustomerId = :companyCustomerId',
    ExpressionAttributeValues: {
      ':companyCustomerId': companyCustomerId,
    },
  });
  return result.Items;
};

export default { list };
