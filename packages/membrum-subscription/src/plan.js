/* @flow */

import type { Plan } from 'types/Membrum';
import cuid from 'cuid';
import db from './database';

const database = db({ TableName: 'MembrumPlans' });

export default (organisationId: string) => {
  const listPlans = async (): Promise<Plan[]> => {
    const result = await database.list({ organisationId });

    return result;
  };

  const getPlan = async (id: string): Promise<Plan> => {
    const result = await database.get({ organisationId, id });

    if (isLatestPlan(result)) {
      return result;
    } else {
      return await getPlan(result.updatedTo);
    }
  };

  const isPlanId = async (id: string): Promise<boolean> => {
    const result = await getPlan(id);

    return isPlan(result);
  };

  const getPlans = async (planIds: string[]): Promise<Plan[]> => {
    let completed = [];
    const results = planIds.map(async id => await getPlan(id));
    await Promise.all(results).then(res => (completed = res));

    return completed;
  };

  const updatePlan = async (plan: Plan) => {
    try {
      const oldPlan = await getPlan(plan.id);
      if (isPlan(oldPlan)) {
        const { newPlan, oldUpdatedValues } = createNewPlan({
          oldValues: oldPlan,
          newValues: { ...plan, id: cuid() },
          timeStamp: Date.now(),
        });

        await database.create(newPlan);

        await database.update(
          { id: plan.id, organisationId },
          oldUpdatedValues
        );
      }
    } catch (err) {
      console.error(err);
    }
  };
  return { listPlans, getPlan, isPlanId, getPlans, updatePlan };
};

const isLatestPlan = plan =>
  plan.id === plan.updatedTo || typeof plan.updatedTo === 'undefined';

const isPlan = plan => typeof plan === 'object';

export const createNewPlan = ({ oldValues, newValues, timeStamp }) => {
  const newPlan = {
    ...oldValues,
    ...newValues,
    updatedTo: newValues.id,
    createdAt: timeStamp,
    updatedAt: timeStamp,
  };

  const oldUpdatedValues = {
    updatedTo: newValues.id,
    updatedAt: timeStamp,
  };

  return { newPlan, oldUpdatedValues };
};
