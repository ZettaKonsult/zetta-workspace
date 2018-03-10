/* @flow */

/**
 * @date 2018-03-07
 */

import type { DatabaseMethod } from 'types/Database';

const get = async (params: {
  db: DatabaseMethod,
  companyCustomerId: string,
}): Promise<{ [string]: any }> => {
  const { db, companyCustomerId } = params;

  console.log(`Fetching customer ${companyCustomerId}.`);
  const result = await db('get', {
    TableName: 'CompanyCustomers',
    Key: { id: companyCustomerId },
  });
  return result.Item;
};

export default { get };
