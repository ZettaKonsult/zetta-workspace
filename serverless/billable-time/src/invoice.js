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

const formatInvoice = (
  { id, recipientId, invoiceRows, createdAt },
  companyCustomerId
) => ({
  id: id || cuid(),
  createdAt: createdAt || Date.now(),
  companyCustomerId,
  recipientId,
  invoiceRows,
});

export const createInvoice = async (db, { invoice, companyCustomerId }) => {
  if (invoice.id) {
    await update(db, invoice);
    return invoice;
  } else {
    // let [recipient, companyCustomer] = await Promise.all([
    //   db('get', {
    //     TableName: 'CompanyCustomer-dev',
    //     Key: { id: 'cjdvmtzgd000104wgiubpx9ru' },
    //   }),
    // ]);
    // companyCustomer = companyCustomer.Item;
    const invoiceItem = formatInvoice(invoice, companyCustomerId);
    await put(db, invoiceItem);

    return invoiceItem;
  }
};

const update = async (db, invoice) =>
  await db('update', {
    TableName: getDbTable(),
    Key: {
      companyCustomerId: invoice.companyCustomerId,
      id: invoice.id,
    },
    UpdateExpression: `Set invoiceRows = :invoiceRows, recipientId = :recipientId`,
    ExpressionAttributeValues: {
      ':invoiceRows': invoice.invoiceRows,
      ':recipientId': invoice.recipientId,
    },
  });

const put = async (db, invoice) =>
  await db('put', {
    TableName: getDbTable(),
    Item: invoice,
  });

const get = async (db, companyCustomerId, id) => {
  const result = await db('get', {
    TableName: getDbTable(),
    Key: { companyCustomerId, id },
  });
  return result.Item;
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

export default { list, get };
