/* @flow */
import type { RuleOptions } from 'types/Rule';
import type { Member, Plan } from 'types/Membrum';

import initPlans from './plan';
import initValidaiton from './subscriptionValidation';
import db from './database';

const database = db({ TableName: 'MembrumUsers' });

//TODO fetch from a customer options table
const options: RuleOptions = {
  sortKey: 'group',
  alwaysEvaluateGroups: ['obligatory'],
};

export default (organisationId: string) => {
  const validator = initValidaiton(organisationId, options);
  const dbPlans = initPlans(organisationId);

  const get = async (memberId: string) => {
    try {
      const { subscription }: Member = await database.get({ ssn: memberId });
      const plans = await dbPlans.getPlans(subscription);

      return plans.filter(plan => plan.organisationId === organisationId);
    } catch (err) {
      console.error(err);
    }
  };

  const update = async (memberId: string, subscription: string[]) => {
    try {
      const isValid = await validator.isValidSubscription(subscription);

      if (isValid) {
        await database.update({ ssn: memberId }, { subscription });
      } else {
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { get, update };
};

const shouldPlanUpdate = (subscription: string[], plans: Plan[]) =>
  subscription.filter(planId => !plans.find(plan => plan.id)).length > 0;
