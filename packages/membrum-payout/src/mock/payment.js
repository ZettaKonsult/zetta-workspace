import cuid from 'cuid';
import db from '../database';

const database = db({ TableName: 'MembrumPlans' });

export default () => {
  const payment = [
    {
      id: 'a',
      date: Date.now(),
      specification: [
        { id: 'cjd1fwht500022wcvx6k52tyt', amount: 110 },
        { id: 'cjd1fwht5000j2wcvimbzapif', amount: 20 },
      ],
    },
    {
      id: 'b',
      date: Date.now(),
      specification: [
        { id: 'cjd1fwht500022wcvx6k52tyt', amount: 110 },
        { id: 'cjd1fwht5000j2wcvimbzapif', amount: 20 },
      ],
    },
  ];

  return payment;
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
