/* @flow */
import type { DatabaseMethod } from 'types/Database';
import type { CompanyCustomer } from 'types/Recipient';

import { getDbTable } from '../util/';

const TableName = getDbTable({ name: 'CompanyCustomers' });

const get = async (params: {
  db: DatabaseMethod,
  companyCustomerId: string,
}): Promise<Array<CompanyCustomer>> => {
  const { db, companyCustomerId } = params;
  console.log(`Fetching customer ${companyCustomerId}.`);
  const result = await db('get', {
    TableName,
    Key: { id: companyCustomerId },
  });
  if (result.Item === undefined) {
    throw new Error(`No such customer (${companyCustomerId})!`);
  }
  return result.Item;
};

export { get };
