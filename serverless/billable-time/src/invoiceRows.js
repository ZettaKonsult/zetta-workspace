/* @flow */
import cuid from 'cuid';

import type { InvoiceRow } from 'types/Invoice';

const getDbTable = (): string => {
  if (!process.env.InvoiceRowsTable) {
    throw new Error('Could not read database table from env.InvoiceRowsTable');
  }
  return process.env.InvoiceRowsTable;
};

const formatData = (data: Object): InvoiceRow => ({
  id: cuid(),
  companyCustomerId: data.companyCustomerId,
  createdAt: Date.now(),
  recipientIds: [data.recipientId],
  price: data.price,
  description: data.description,
  interval: data.unit,
  intervalCount: 'once',
  labels: [],
  group: 'none',
  epochLastProcessed: 0,
});

export const addInvoiceRow = async (db: any, data: Object) => {
  try {
    const params = {
      TableName: getDbTable(),
      Item: formatData(data),
    };

    await db('put', params);

    return params.Item;
  } catch (err) {
    return err;
  }
};

export const allInvoiceRows = async (db: any, customerId: string) => {
  try {
    const result = await db('query', {
      TableName: getDbTable(),
      KeyConditionExpression: 'companyCustomerId = :companyCustomerId',
      ExpressionAttributeValues: {
        ':companyCustomerId': customerId,
      },
    });

    return result;
  } catch (err) {
    return err;
  }
};

export const fetchInvoiceRows = async (
  db: any,
  companyCustomerId: string,
  ids: string[]
) => {
  try {
    const fetchRows = ids.map(id =>
      invoiceRow(db, { companyCustomerId: companyCustomerId, id })
    );
    let result = await Promise.all(fetchRows);
    return result.map(item => item.Item);
  } catch (err) {
    return err;
  }
};

const invoiceRow = async (db, Key) =>
  await db('get', {
    TableName: getDbTable(),
    Key,
  });
