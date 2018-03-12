/* @flow */

/**
 * @date 2018-03-05
 */

import type { DatabaseMethod } from 'types/Database';
import type { Invoice, InvoiceData } from 'types/Invoice';

import { getDbTable } from '../util/database';
import CompanyCustomer from './customer';
import Status from './status';
import invoicePDF from '../mail/emailDoc';
import recipientDb from '../recipient/recipient';
import cuid from 'cuid';

const table = getDbTable({ name: 'Invoices' });

const newInvoice = (params: {
  invoice: InvoiceData,
  companyCustomerId: string,
}): Invoice => {
  const { companyCustomerId, invoice } = params;

  return create({
    id: cuid(),
    createdAt: Date.now(),
    price: invoice.price,
    recipientIds: invoice.recipientIds,
    companyCustomerId,
  });
};

const create = (params: {
  id: string,
  companyCustomerId: string,
  price: number,
  recipientIds: Array<string>,
  createdAt: number,
}): Invoice => {
  const { id, createdAt, companyCustomerId, price, recipientIds } = params;

  const invoiceId = id || cuid();
  const creation = createdAt || Date.now();

  const itemStatus = Status.newStatus({ invoiceId, createdAt: creation });

  return {
    id: invoiceId,
    createdAt: creation,
    companyCustomer: companyCustomerId,
    price: price,
    recipients: recipientIds,
    itemStatus,
    locked: false,
  };
};

export const createInvoice = async (params: {
  db: DatabaseMethod,
  invoice: InvoiceData,
  companyCustomerId: string,
}): Promise<Invoice | InvoiceData> => {
  const { db, invoice, companyCustomerId } = params;

  if (invoice.id) {
    await update({ db, invoice });
    return invoice;
  } else {
    const invoiceItem = newInvoice({ invoice, companyCustomerId });
    await put({ db, invoice: invoiceItem });
    await Status.create({ db, status: invoiceItem.itemStatus });

    return invoiceItem;
  }
};

export const mail = async (params: {
  db: DatabaseMethod,
  invoiceId: string,
  companyCustomerId: string,
}) => {
  const { db, invoiceId, companyCustomerId } = params;

  try {
    let [companyCustomer, invoice] = await Promise.all([
      CompanyCustomer.get({ db, companyCustomerId }),
      get({ db, companyCustomerId, invoiceId }),
    ]);
    let recipient = await recipientDb.get({
      db,
      companyCustomerId,
      recipientId: invoice.recipientId,
    });
    const constructed = Object.assign(
      {},
      { companyCustomer: companyCustomer },
      { invoice: invoice },
      { recipient: recipient }
    );
    await invoicePDF(constructed);
    await lockInvoice({ db, companyCustomerId, invoiceId });
  } catch (error) {
    throw error;
  }
};

export const lockInvoice = async (params: {
  db: DatabaseMethod,
  invoiceId: string,
  companyCustomerId: string,
}) => {
  const { db, invoiceId, companyCustomerId } = params;

  try {
    await db('update', {
      TableName: table,
      Key: {
        companyCustomerId: companyCustomerId,
        id: invoiceId,
      },
      UpdateExpression: `Set locked=:locked`,
      ExpressionAttributeValues: {
        ':locked': true,
      },
    });
  } catch (error) {
    throw error;
  }
};

const update = async (params: { db: DatabaseMethod, invoice: InvoiceData }) => {
  const { db, invoice } = params;

  try {
    await db('update', {
      TableName: table,
      Key: {
        companyCustomer: invoice.companyCustomerId,
        id: invoice.id,
      },
      ConditionExpression: 'locked=:shouldNotBeLocked',
      UpdateExpression: `Set invoiceRows = :invoiceRows, recipientId = :recipientId`,
      ExpressionAttributeValues: {
        ':shouldNotBeLocked': false,
        ':recipient': invoice.recipientIds,
      },
    });
  } catch (error) {
    throw error;
  }
};

const updateStatus = async (params: {
  db: DatabaseMethod,
  invoiceId: string,
  newStatus: string,
}) => {
  const { db, invoiceId, newStatus } = params;

  try {
    await db('update', {
      TableName: table,
      Key: {
        id: invoiceId,
      },
      ConditionExpression: 'locked=:shouldNotBeLocked',
      UpdateExpression: `Set itemStatus = :itemStatus`,
      ExpressionAttributeValues: {
        ':itemStatus': newStatus,
      },
    });
  } catch (error) {
    throw error;
  }
};

const put = async (params: { db: DatabaseMethod, invoice: Invoice }) => {
  const { db, invoice } = params;

  try {
    await db('put', {
      TableName: table,
      Item: invoice,
    });
  } catch (error) {
    throw error;
  }
};

const get = async (params: {
  db: DatabaseMethod,
  invoiceId: string,
  companyCustomerId: string,
}): Promise<{ [string]: any }> => {
  const { db, invoiceId } = params;

  return (await db('get', {
    TableName: table,
    Key: { id: invoiceId },
  })).Item;
};

const getStatus = async (params: {
  db: DatabaseMethod,
  invoiceId: string,
}): Promise<{ [string]: any }> => {
  const { db, invoiceId } = params;

  console.log(`Fetching status for invoice ${invoiceId}.`);
  return (await db('get', {
    TableName: table,
    Key: { id: invoiceId },
  })).Item.itemStatus;
};

const list = async (params: {
  db: DatabaseMethod,
  companyCustomerId: string,
}): Promise<{ [string]: any }> => {
  const { db, companyCustomerId } = params;

  console.log(`Fetching invoices for ${companyCustomerId}.`);
  try {
    return (await db('query', {
      TableName: table,
      IndexName: 'companyCustomer',
      KeyConditionExpression: '#companyCustomer = :companyCustomer',
      ExpressionAttributeNames: {
        '#companyCustomer': 'companyCustomer',
      },
      ExpressionAttributeValues: {
        ':companyCustomer': companyCustomerId,
      },
    })).Items;
  } catch (error) {
    throw error;
  }
};

export default { newInvoice, list, get, getStatus, mail, updateStatus };
