/* @flow */
import type { DatabaseMethod } from 'types/Database';
import type { Recipient } from 'types/Recipient';

import cuid from 'cuid';

const getDbTable = (): string => {
  if (!process.env.RecipientTable) {
    throw new Error('Could not read database table from env.RecipientTable');
  }
  return process.env.RecipientTable;
};

const format = (params: {
  data: Object,
  companyCustomerId: string,
}): Recipient => {
  const { data, companyCustomerId } = params;

  return {
    id: data.id || cuid(),
    companyCustomerId: companyCustomerId,
    email: data.email,
    address: data.address,
    city: data.city,
    zipcode: data.zipcode,
    firstName: data.firstName,
    lastName: data.lastName,
    ssn: data.ssn,
    mobile: data.mobile,
    company: data.company,
    reccuringPayments: [],
  };
};

const saveRecipient = async (params: {
  db: DatabaseMethod,
  recipient: Recipient,
  companyCustomerId: string,
}): Promise<Recipient> => {
  const { db, recipient, companyCustomerId } = params;

  if (recipient.id) {
    await update({ db, recipient });
    return recipient;
  } else {
    let recipientItem = format({ data: recipient, companyCustomerId });
    await create({ db, recipient: recipientItem });
    return recipientItem;
  }
};

const create = async (params: { db: DatabaseMethod, recipient: Recipient }) => {
  const { db, recipient } = params;

  const args = {
    TableName: getDbTable(),
    Item: recipient,
  };

  await db('put', args);

  return args.Item;
};

const update = async (params: { db: DatabaseMethod, recipient: Recipient }) => {
  const { db, recipient } = params;

  return await db('update', {
    TableName: getDbTable(),
    Key: {
      companyCustomerId: recipient.companyCustomerId,
      id: recipient.id,
    },
    UpdateExpression:
      `Set email = :email, address = :address, city = :city,` +
      ` zipcode = :zipcode, firstName = :firstName, lastName = :lastName,` +
      ` ssn = :ssn, mobile = :mobile, company = :company`,
    ExpressionAttributeValues: {
      ':email': recipient.email,
      ':address': recipient.address,
      ':city': recipient.city,
      ':zipcode': recipient.zipcode,
      ':firstName': recipient.firstName,
      ':lastName': recipient.lastName,
      ':ssn': recipient.ssn || null,
      ':mobile': recipient.mobile,
      ':company': recipient.company || null,
    },
  });
};

const get = async (params: {
  db: DatabaseMethod,
  recipientId: string,
  companyCustomerId: string,
}): Promise<Recipient> => {
  const { db, recipientId, companyCustomerId } = params;

  const result = await db('get', {
    TableName: 'Recipients-dev',
    Key: { recipientId, companyCustomerId },
  });
  return result.Item;
};

const list = async (params: {
  db: DatabaseMethod,
  companyCustomerId: string,
}): Promise<Recipient[]> => {
  const { db, companyCustomerId } = params;

  const result = await db('query', {
    TableName: getDbTable(),
    KeyConditionExpression: 'companyCustomerId = :companyCustomerId',
    ExpressionAttributeValues: {
      ':companyCustomerId': companyCustomerId,
    },
  });
  return result.Items;
};

export default { save: saveRecipient, list, get };
