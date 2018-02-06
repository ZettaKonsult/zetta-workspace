import cuid from 'cuid';
import db from '../database';

const database = db({ TableName: 'MembrumPayments' });

const undefinedNation = 'cjd1fwht5000i2wcvfmxeqhz2';
const trf = 'cjd1fwht5000j2wcvimbzapif';
const af = 'cjd1fwht5000k2wcvmo4xxfln';
const tlth = 'cjd1fwht500022wcvx6k52tyt';
const wermlands = 'cjd1fwht5000h2wcvt5vjxyjr';
const smalands = 'cjd1fwht5000l2wcvd1p5nqth';

export default async () => {
  const planRules = [
    {
      id: cuid(),
      memberId: cuid(),
      createdAt: Date.now(),
      specification: [trf, af, tlth, undefinedNation],
    },
    {
      id: cuid(),
      memberId: cuid(),
      createdAt: Date.now(),
      specification: [trf, af, tlth, wermlands],
    },
    {
      id: cuid(),
      memberId: cuid(),
      createdAt: Date.now(),
      specification: [trf, smalands],
    },
  ];

  await asyncForEach(planRules, rule => database.create(rule));
  console.log('Payment created');
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
