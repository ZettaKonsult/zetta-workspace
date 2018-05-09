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

  return (await db('get', {
    TableName,
    Key: { id: companyCustomerId },
  })).Item;
};

export { get };
