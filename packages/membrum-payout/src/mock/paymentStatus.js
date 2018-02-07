import cuid from 'cuid';
import db from '../database';

const database = db({ TableName: 'MembrumPlanRules' });

export default () => {
  const paymentStatus = [
    { id: cuid(), paymentId: 'a', date: Date.now(), status: 'pending' },
    { id: cuid(), paymentId: 'a', date: Date.now() + 1, status: 'succeeded' },
    {
      id: cuid(),
      paymentId: 'a',
      date: Date.now() + 2,
      status: 'transferred',
      transferred: {
        from: 'cjd1fwht500022wcvx6k52tyt',
        to: 'cjd1fwht500092wcvcptee1rp',
      },
    },
    {
      id: cuid(),
      paymentId: 'a',
      date: Date.now() + 3,
      status: 'transferred',
      transferred: {
        from: 'cjd1fwht500092wcvcptee1rp',
        to: 'cjd1fwht5000a2wcvceik4vzv',
      },
    },
    { id: cuid(), paymentId: 'b', date: Date.now(), status: 'pending' },
    { id: cuid(), paymentId: 'b', date: Date.now() + 1, status: 'succeeded' },
  ];

  return paymentStatus;
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
