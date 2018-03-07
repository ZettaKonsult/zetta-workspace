/* @flow */

/**
 * @date 2018-03-05
 */

import db from '../src/database';

const tableGet = async (params: { table: string, key: { id: string } }) =>
  await db('get', {
    TableName: params.table,
    Key: params.key,
  });

export default { tableGet };
