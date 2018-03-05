/* @flow */
import cuid from 'cuid';

import type { Recipient } from 'types/Recipient';

const getDbTable = (): string => {
  if (!process.env.RecipientTable) {
    throw new Error('Could not read database table from env.RecipientTable');
  }
  return process.env.RecipientTable;
};

const formatData = (data: Object, companyCustomerId): Recipient => ({
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
});

const saveRecipient = async (db, { recipient, companyCustomerId }) => {
  if (recipient.id) {
    await update(db, recipient);
  } else {
    let recipientItem = formatData(recipient, companyCustomerId);
    await create(db, recipientItem);
    return recipientItem;
  }
};

const create = async (db, recipient) => {
  const params = {
    TableName: getDbTable(),
    Item: recipient,
  };

  await db('put', params);

  return params.Item;
};

const update = async (db, recipient) =>
  await db('update', {
    TableName: getDbTable(),
    Key: {
      companyCustomerId: recipient.companyCustomerId,
      id: recipient.id,
    },
    UpdateExpression: `Set email = :email, address = :address, city = :city, zipcode = :zipcode, firstName = :firstName, lastName = :lastName, ssn = :ssn, mobile = :mobile, company = :company`,
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

const get = async (db, companyCustomerId, id) => {
  const result = await db('get', {
    TableName: 'Recipients-dev',
    Key: { id, companyCustomerId },
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
export default { save: saveRecipient, list, get };
