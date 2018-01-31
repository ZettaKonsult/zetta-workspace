/* @flow */

import type { Plan } from 'types/Membrum';
import db from './database';

const database = db({ TableName: 'MembrumPlans' });

export default (organisationId: string) => {
  const listPlans = async () => {
    const result = await database.list({ organisationId });
    return result;
  };

  const isPlanId = async (id: string): boolean => {
    const result = await database.get({ organisationId, id });
    return typeof result === 'object';
  };

  const getPlans = async (planIds: string[]): Plan[] => {
    let completed = [];
    const results = planIds.map(
      async id => await database.get({ organisationId, id })
    );
    await Promise.all(results).then(res => (completed = res));
    return completed;
  };

  return { listPlans, isPlanId, getPlans };
};
