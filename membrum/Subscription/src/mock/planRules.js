import cuid from 'cuid';
import db from '../database';

const database = db({ TableName: 'MembrumPlanRules' });

export const generatePlanRules = async (ownerId, dbPlans) => {
  const planRules = [
    {
      id: cuid(),
      organisationId: ownerId,
      name: 'unionRule',
      group: 'studentlund',
      attribute: 'labels',
      key: 'union',
      func: 'only',
      value: '1',
      error: 'There should be only 1 union',
    },
    {
      id: cuid(),
      organisationId: ownerId,
      name: 'nationRule',
      group: 'studentlund',
      attribute: 'labels',
      key: 'nation',
      func: 'atLeast',
      value: '1',
      error: 'There should be atLeast 1 nation',
    },
    {
      id: cuid(),
      organisationId: ownerId,
      name: 'trfRule',
      group: 'obligatory',
      attribute: 'id',
      key: dbPlans.find(plan => plan.name === 'Terminsräkningsföreningen').id,
      func: 'only',
      value: '1',
      error: 'TRF must be part of the subscription',
    },
    {
      id: cuid(),
      organisationId: ownerId,
      name: 'afRule',
      group: 'studentlund',
      attribute: 'id',
      key: dbPlans.find(plan => plan.name === 'Akademiska Föreningen').id,
      func: 'only',
      value: '1',
      error: 'AF must be part of the subscription',
    },
  ];

  await asyncForEach(planRules, rule => database.create(rule));
  console.log('Rules created');
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
