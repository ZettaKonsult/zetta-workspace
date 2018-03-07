/* @flow */

/**
 * @date 2018-03-07
 */

import type { DatabaseMethod } from 'types/Database';

const get = async (params: {
  db: DatabaseMethod,
  companyCustomerId: string,
}) => {
  const { db, companyCustomerId } = params;

  const result = await db('get', {
    TableName: 'CompanyCustomer-dev',
    Key: { id: companyCustomerId },
  });
  return result.Item;
};

export default { get };
