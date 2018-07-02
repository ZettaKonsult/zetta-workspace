/* @flow */

import { getDbTable } from '../util/database';

const RECIPIENTS_TABLE = getDbTable({ name: 'Recipients' });

const getBySSN = async ({ db, ssn }: { ssn: string }): Promise<Object> => {
  const result = await db('query', {
    TableName: RECIPIENTS_TABLE,
    IndexName: 'ssn',
    KeyConditionExpression: '#ssn = :ssn',
    ExpressionAttributeNames: {
      '#ssn': 'ssn',
    },
    ExpressionAttributeValues: {
      ':ssn': ssn,
    },
  });
  return result.Items[0];
};

export { getBySSN };
