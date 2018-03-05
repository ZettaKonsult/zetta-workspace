import cuid from 'cuid';

import invoicePDF from './transform/handler';
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
  locked: false,
});

export const createInvoice = async (db, { invoice, companyCustomerId }) => {
  if (invoice.id) {
    await update(db, invoice);
    return invoice;
  } else {
    const invoiceItem = formatInvoice(invoice, companyCustomerId);
    await put(db, invoiceItem);

    return invoiceItem;
  }
};

export const mailInvoice = async (db, companyCustomerId, invoiceId) => {
  try {
    let [companyCustomer, invoice] = await Promise.all([
      getCompanyCustomer(db, companyCustomerId),
      get(db, companyCustomerId, invoiceId),
    ]);
    let recipient = await recipientDb.get(
      db,
      companyCustomerId,
      invoice.recipientId
    );
    const constructed = Object.assign(
      {},
      { companyCustomer: companyCustomer },
      { invoice: invoice },
      { recipient: recipient }
    );
    await invoicePDF(constructed);
    await lockInvoice(db, companyCustomerId, invoiceId);
  } catch (error) {
    throw error;
  }
};

const lockInvoice = async (db, companyCustomerId, invoiceId) =>
  await db('update', {
    TableName: getDbTable(),
    Key: {
      companyCustomerId: companyCustomerId,
      id: invoiceId,
    },
    UpdateExpression: `Set locked=:locked`,
    ExpressionAttributeValues: {
      ':locked': true,
    },
  });

const update = async (db, invoice) =>
  await db('update', {
    TableName: getDbTable(),
    Key: {
      companyCustomerId: invoice.companyCustomerId,
      id: invoice.id,
    },
    ConditionExpression: 'locked=:shouldNotBeLocked',
    UpdateExpression: `Set invoiceRows = :invoiceRows, recipientId = :recipientId`,
    ExpressionAttributeValues: {
      ':shouldNotBeLocked': false,
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

const getCompanyCustomer = async (db, companyCustomerId) => {
  const result = await db('get', {
    TableName: 'CompanyCustomer-dev',
    Key: { id: companyCustomerId },
  });
  return result.Item;
};
