/* @flow */

/**
 * @date 2018-03-05
 */

import type { DatabaseMethod } from 'types/Database';
import type { Invoice } from 'types/Invoice';

import { getDbTable } from '../database';
import CompanyCustomer from './customer';
import Status from './status';
import invoicePDF from '../transform/handler';
import recipientDb from '../recipient';
import cuid from 'cuid';

const table = getDbTable({ name: 'Invoices' });

const newInvoice = (params: {
  recipientIds: Array<string>,
  companyCustomerId: string,
}) => {
  const { recipientIds, companyCustomerId } = params;

  return create({
    id: cuid(),
    createdAt: Date.now(),
    recipientIds,
    companyCustomerId,
  });
};

const create = (params: {
  id: string,
  recipientIds: Array<string>,
  createdAt: number,
  companyCustomerId: string,
}) => {
  const { id, createdAt, companyCustomerId, recipientIds } = params;

  return {
    id: id || cuid(),
    createdAt: createdAt || Date.now(),
    companyCustomerId,
    recipientIds,
    locked: false,
  };
};

export const createInvoice = async (params: {
  db: DatabaseMethod,
  invoice: Invoice,
  companyCustomerId: string,
}) => {
  const { db, invoice, companyCustomerId } = params;

  if (invoice.id) {
    await update({ db, invoice });
    return invoice;
  } else {
    const invoiceItem = newInvoice({ invoice, companyCustomerId });
    await put({ db, invoiceItem });
    await Status.create({ invoiceItem });

    return invoiceItem;
  }
};

export const mailInvoice = async (params: {
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

const update = async (params: { db: DatabaseMethod, invoice: Invoice }) => {
  const { db, invoice } = params;

  try {
    await db('update', {
      TableName: table,
      Key: {
        companyCustomerId: invoice.companyCustomerId,
        id: invoice.id,
      },
      ConditionExpression: 'locked=:shouldNotBeLocked',
      UpdateExpression: `Set invoiceRows = :invoiceRows, recipientId = :recipientId`,
      ExpressionAttributeValues: {
        ':shouldNotBeLocked': false,
        ':recipientIds': invoice.recipientIds,
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
}) => {
  const { db, invoiceId, companyCustomerId } = params;

  return (await db('get', {
    TableName: table,
    Key: { companyCustomerId, invoiceId },
  })).Item;
};

const list = async (params: {
  db: DatabaseMethod,
  companyCustomerId: string,
}) => {
  const { db, companyCustomerId } = params;

  return (await db('query', {
    TableName: table,
    KeyConditionExpression: 'companyCustomerId = :companyCustomerId',
    ExpressionAttributeValues: {
      ':companyCustomerId': companyCustomerId,
    },
  })).Item;
};

export default { list, get };
