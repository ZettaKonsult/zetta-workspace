import { incrementToNextLowerBound } from 'date-primitive-utils';

import { getDbTable } from '../util/database';

import { listAllPlansToProcess } from './list';

const table = getDbTable({ name: 'Plans' });

export default async ({ db }) => {
  const plans = await listAllPlansToProcess({ db });

  /*
    DO SOME KIND OF PROCESS TO SEND INVOICE TO ALL PLANS
  */

  const result = await updateNextProcess({ db, plans });
  console.log(result);
};

const updateNextProcess = async ({ db, plans }) => {
  const updatePromise = plans.map(item => {
    return db('update', {
      TableName: table,
      Key: {
        companyCustomerId: item.companyCustomerId,
        id: item.id,
      },
      ReturnValues: 'ALL_NEW',
      UpdateExpression: 'set #epochNextProcess = :epochNextProcess',
      ExpressionAttributeNames: {
        '#epochNextProcess': 'epochNextProcess',
      },
      ExpressionAttributeValues: {
        ':epochNextProcess': incrementToNextLowerBound(
          item.epochNextProcess,
          item.intervalCount
        ),
      },
    });
  });
  const result = Promise.all(updatePromise);
  return result;
};
