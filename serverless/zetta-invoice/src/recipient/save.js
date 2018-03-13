/* @flow */
import type { DatabaseMethod } from 'types/Database';
import type { Recipient } from 'types/Recipient';

import { getDbTable } from '../util/database';
import { format } from './formatRecipient';

const table = getDbTable({ name: 'Recipients' });

export default async (params: {
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
    TableName: table,
    Item: recipient,
  };

  await db('put', args);

  return args.Item;
};

const update = async (params: { db: DatabaseMethod, recipient: Recipient }) => {
  const { db, recipient } = params;

  return await db('update', {
    TableName: table,
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
