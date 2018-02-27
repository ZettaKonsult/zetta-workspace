/* @flow */
import cuid from 'cuid';

import type { Recipient } from 'types/Recipient';

const getDbTable = (): string => {
  if (!process.env.Recipients) {
    throw new Error('Could not read database table from env.Recipients');
  }
  return process.env.Recipients;
};

const formatData = (data: Object): Recipient => ({
  id: cuid(),
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

const list = async (db, { companyCustomerId }) => {
  await db('query', {
    TableName: getDbTable(),
    KeyConditionExpression: 'companyCustomerId = :companyCustomerId',
    ExpressionAttributeValues: {
      ':companyCustomerId': companyCustomerId,
    },
  });
};

export default { create, list };
