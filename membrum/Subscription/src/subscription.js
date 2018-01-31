/* @flow */

import db from './database';
import { ruleValidator } from 'rule-validator';

import plansDatabase from './plan';

const dbUsers = db({ TableName: 'MembrumUsers' });
const dbRules = db({ TableName: 'MembrumPlanRules' });

export default (organisationId: string) => {
  const dbPlans = plansDatabase(organisationId);

  const isValidSubscription = async (planIds: string[]) => {
    const validationChecks = [checkPlanIds, checkRules];
    return validationChecks.reduce(
      async (valid, check) => valid && (await check(planIds)),
      true
    );
  };

  const checkPlanIds = async (planIds): Promise<boolean> => {
    return await asyncEvery(
      planIds,
      async (id: string) => await dbPlans.isPlanId(id)
    );
  };

  const checkRules = async planIds => {
    const plans = await dbPlans.getPlans(planIds);
    const rules = await dbRules.list({ organisationId });
    return ruleValidator(rules, {
      sortKey: 'group',
      alwaysEvaluateGroups: ['obligatory'],
    }).evaluatePlan(plans);
  };

  return { isValidSubscription };
};

const asyncEvery = async (array, callback): Promise<boolean> => {
  let result = true;
  for (let index = 0; index < array.length; index++) {
    result = result && (await callback(array[index], index, array));
  }
  return result;
};
