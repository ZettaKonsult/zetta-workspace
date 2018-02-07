/* @flow */
import type { Payment, Plan } from 'types/Membrum';

export const payoutSum = (plans: Plan[], payoutMap: Object) => {
  return Object.keys(payoutMap).reduce((total, key) => {
    let plan = plans.find(plan => plan.id === key);
    return {
      ...total,
      [key]: payoutMap[key] * plan.amount,
    };
  }, {});
};
