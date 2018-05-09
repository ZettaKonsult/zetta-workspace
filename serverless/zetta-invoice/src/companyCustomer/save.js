/* @flow */
import type { DatabaseMethod } from 'types/Database';
import type { CompanyCustomer } from 'types/Recipient';

import { getDbTable } from '../util/database';
import { format } from './formatCompanyCustomer';

const table = getDbTable({ name: 'CompanyCustomers' });

export default async (params: {
  db: DatabaseMethod,
  companyCustomer: CompanyCustomer,
}): Promise<CompanyCustomer> => {
  const { db, companyCustomer } = params;

  if (companyCustomer.id) {
    await update({ db, companyCustomer });
    return companyCustomer;
  } else {
    let result = format({ data: companyCustomer });
    await create({ db, companyCustomer: result });
    return result;
  }
};

type Input = {
  db: DatabaseMethod,
  companyCustomer: CompanyCustomer,
};
const create = async (params: Input) => {
  const { db, companyCustomer } = params;
  const args = {
    TableName: table,
    Item: companyCustomer,
  };

  await db('put', args);

  return args.Item;
};

const update = async (params: Input) => {
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
