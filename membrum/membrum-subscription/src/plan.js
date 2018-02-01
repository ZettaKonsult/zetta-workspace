/* @flow */

import type { Plan } from 'types/Membrum';
import cuid from 'cuid';
import db from './database';

const database = db({ TableName: 'MembrumPlans' });

export default (organisationId: string): Object => {
  const listPlans = async (): Promise<Plan[]> => {
    const result = await database.list({ organisationId });
    return result;
  };

  const getPlan = async (id: string): Promise<Plan> => {
    const result = await database.get({ organisationId, id });
    if (!result.updatedTo) {
      return result;
    } else {
      return await getPlan(result.updatedTo);
    }
  };

  const isPlanId = async (id: string): Promise<boolean> => {
    const result = await getPlan(id);
    return typeof result === 'object';
  };

  const getPlans = async (planIds: string[]): Promise<Plan[]> => {
    let completed = [];
    const results = planIds.map(async id => await getPlan(id));
    await Promise.all(results).then(res => (completed = res));
    return completed;
  };

  const updatePlan = async (plan: Plan) => {
    try {
      const exists = await isPlanId(plan.id);
      if (exists) {
        const newPlanId = cuid();
        let timeStamp = Date.now();
        const oldPlan = await getPlan(plan.id);
        await database.create({
          ...oldPlan,
          ...plan,
          id: newPlanId,
          updatedTo: undefined,
          createdAt: timeStamp,
          updatedAt: timeStamp,
        });

        timeStamp = Date.now();
        await database.update(
          { id: plan.id, organisationId },
          { updatedTo: newPlanId, updatedAt: timeStamp }
        );
      }
    } catch (err) {
      console.error(err);
    }
  };
  return { listPlans, getPlan, isPlanId, getPlans, updatePlan };
};
