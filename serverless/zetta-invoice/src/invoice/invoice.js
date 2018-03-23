/* @flow */

/**
 * @date 2018-03-05
 */

import type { DatabaseMethod } from 'types/Database';
import type { Invoice, InvoiceData } from 'types/Invoice';

import { getDbTable } from '../util/database';
import Mail from '../mail/mail';
import Status from './status';
import cuid from 'cuid';

const INVOICES_TABLE = getDbTable({ name: 'Invoices' });
const INVOICESTATUS_TABLE = getDbTable({ name: 'InvoiceStatuses' });

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

  console.log(`Creating invoice...`);
  if (invoice.id) {
    console.log(`ID specified. Updating...`);
    await update({ db, invoice });
    return invoice;
  } else {
    console.log(`No ID specified. Creating...`);
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
  discount?: number,
  tax?: number,
}): Promise<string> => {
  const { db, invoiceId, companyCustomerId } = params;
  let { discount, tax } = params;

  console.log(`Checking discount and tax: ${discount} and ${tax}.`);
  [discount, tax] = zeroIfNull({ numbers: [discount, tax] });
  console.log(`Found discount and tax: ${discount} and ${tax}.`);

  console.log(
    `Mailing process for invoice ${invoiceId}, customer ${companyCustomerId} started.`
  );
  try {
    await Mail.sendInvoice({
      companyCustomerId,
      invoiceId,
      discount,
      tax,
    });
    await lockInvoice({ db, companyCustomerId, invoiceId });
    return 'Successfully sent invoice.';
  } catch (error) {
    throw error;
  }
};

const zeroIfNull = (params: { numbers: Array<any> }): Array<number> =>
  params.numbers.reduce(
    (result, arg) => [...result, typeof arg === 'number' ? arg : 0.0],
    []
  );

export const lockInvoice = async (params: {
  db: DatabaseMethod,
  invoiceId: string,
  companyCustomerId: string,
}) => {
  const { db, invoiceId, companyCustomerId } = params;

  console.log(
    `Locking invoice ${invoiceId} for customer ${companyCustomerId}.`
  );
  try {
    await db('update', {
      TableName: INVOICES_TABLE,
      Key: {
        companyCustomer: companyCustomerId,
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
  const { id, companyCustomerId, recipientIds } = invoice;

  console.log(`Updating invoice ${id}, customer ${companyCustomerId}.`);
  try {
    await db('update', {
      TableName: INVOICES_TABLE,
      Key: {
        companyCustomer: companyCustomerId,
        id: id,
      },
      ConditionExpression: 'locked=:shouldNotBeLocked',
      UpdateExpression: `Set invoiceRows = :invoiceRows, recipientId = :recipientId`,
      ExpressionAttributeValues: {
        ':shouldNotBeLocked': false,
        ':recipient': recipientIds,
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

  console.log(
    `Updating invoice status for invoice ${invoiceId} to ${newStatus}.`
  );
  try {
    await db('update', {
      TableName: INVOICES_TABLE,
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

  console.log(`Putting invoice ${invoice.id}.`);
  try {
    await db('put', {
      TableName: INVOICES_TABLE,
      Item: invoice,
    });
  } catch (error) {
    throw error;
  }
};

const get = async (params: {
  db: DatabaseMethod,
  companyCustomerId: string,
  invoiceId: string,
}): Promise<{ [string]: any }> => {
  const { db, companyCustomerId, invoiceId } = params;

  console.log(`Fetching invoice ${invoiceId}, customer ${companyCustomerId}.`);

  return (await db('query', {
    TableName: INVOICES_TABLE,
    KeyConditionExpression: 'companyCustomer = :companyCustomerId AND id = :id',
    ExpressionAttributeValues: {
      ':companyCustomerId': companyCustomerId,
      ':id': invoiceId,
    },
  })).Items[0];
};

const getStatus = async (params: {
  db: DatabaseMethod,
  companyCustomerId: string,
  invoiceId: string,
}): Promise<{ [string]: any }> => (await get(params)).itemStatus;

const getStatuses = async (params: {
  db: DatabaseMethod,
  companyCustomerId: string,
  invoiceId: string,
}): Promise<{ [string]: any }> => {
  const { db, invoiceId } = params;

  console.log(`Fetching statuses for invoice ${invoiceId}.`);

  return (await db('query', {
    TableName: INVOICESTATUS_TABLE,
    KeyConditionExpression: '#invoiceId = :invoiceId',
    ExpressionAttributeNames: {
      '#invoiceId': 'invoiceId',
    },
    ExpressionAttributeValues: {
      ':invoiceId': invoiceId,
    },
  })).Items;
};

const list = async (params: {
  db: DatabaseMethod,
  companyCustomerId: string,
}): Promise<{ [string]: any }> => {
  const { db, companyCustomerId } = params;

  console.log(`Fetching invoices for customer ${companyCustomerId}.`);
  try {
    return (await db('query', {
      TableName: INVOICES_TABLE,
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

export default {
  newInvoice,
  list,
  get,
  getStatus,
  getStatuses,
  mail,
  updateStatus,
};
