import cuid from 'cuid';
import db from '../database';

const database = db({ TableName: 'MembrumPaymentStatuses' });

const payid1 = 'cjdbcy1i80000d0cvck6ssbm1';
const payid2 = 'cjdbcy1i80004d0cv9nodrag4';
const payid3 = 'cjdbcy1i80002d0cv9bvb6eay';

const date = Date.now();

export default async (ownerId, dbPlans) => {
  const planRules = [
    {
      id: cuid(),
      createdAt: date,
      paymentId: payid1,
      status: 'pending',
    },
    {
      id: cuid(),
      createdAt: date + 1,
      paymentId: payid1,
      status: 'succeeded',
    },
    {
      id: cuid(),
      createdAt: date + 2,
      paymentId: payid1,
      status: 'transferred',
      transferred: {
        from: 'cjd1fwht5000h2wcvt5vjxyjr',
        to: 'cjd1fwht5000g2wcvaqa015ea',
      },
    },
    {
      id: cuid(),
      createdAt: date,
      paymentId: payid2,
      status: 'pending',
    },
    {
      id: cuid(),
      createdAt: date + 1,
      paymentId: payid2,
      status: 'succeeded',
    },
    {
      id: cuid(),
      createdAt: date,
      paymentId: payid3,
      status: 'pending',
    },
    {
      id: cuid(),
      createdAt: date + 1,
      paymentId: payid3,
      status: 'succeeded',
    },
  ];

  await asyncForEach(planRules, rule => database.create(rule));
  console.log('Status created');
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
