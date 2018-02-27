/* @flow */
import cuid from 'cuid';

import type { Recipient } from 'types/Recipient';

const getDbTable = (): string => {
  if (!process.env.RecipientTable) {
    throw new Error('Could not read database table from env.RecipientTable');
  }
  return process.env.RecipientTable;
};

const formatData = (data: Object): Recipient => ({
  id: cuid(),
  companyCustomerId: data.companyCustomerId,
  email: data.email,
  address: data.address,
  city: data.city,
  zipcode: data.zipcode,
  firstName: data.firstName,
  lastName: data.lastName,
  ssn: data.ssn,
  company: data.company,
  reccuringPayments: [],
});

const create = async (db, data) => {
  const params = {
    TableName: getDbTable(),
    Item: formatData(data),
  };

  await db('put', params);

  return params.Item;
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
export default { create, list };
