/* @flow */
import cuid from 'cuid';

import type { InvoiceRow } from 'types/Invoice';

if (!process.env.InvoiceRowsTable) {
  throw new Error('Could not read database table from env.InvoiceTable');
}
const InvoiceRowsTable = process.env.InvoiceRowsTable;

const formatData = (data: Object): InvoiceRow => ({
  id: cuid(),
  createdAt: Date.now(),
  companyCustomerId: data.companyCustomerId,
  recipientId: data.recipientId,
  unit: data.unit,
  price: data.price,
  description: data.description,
  itemStatus: 'pending',
});

export const addBillableRow = async (db: any, data: Object) => {
  try {
    const params = {
      TableName: InvoiceRowsTable,
      Item: formatData(data),
    };

    await db('put', params);

    return params.Item;
  } catch (err) {
    return err;
  }
};

export const allBillableRows = async (db: any, customerId: string) => {
  try {
    const result = await db('query', {
      TableName: InvoiceRowsTable,
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

export const billableRows = async (
  db: any,
  companyCustomerId: string,
  ids: string[]
) => {
  try {
    const fetchRows = ids.map(id =>
      billableRow(db, { companyCustomerId: companyCustomerId, id })
    );
    let result = await Promise.all(fetchRows);
    return result.map(item => item.Item);
  } catch (err) {
    return err;
  }
};

const billableRow = async (db, Key) =>
  await db('get', {
    TableName: InvoiceRowsTable,
    Key,
  });
