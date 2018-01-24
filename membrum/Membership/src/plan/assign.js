/* @flow */

/**
 * @date 2018-01-16
 */

import type { Subscription, Plan, UserData } from '../types';
import { config } from '../config';
import plans from './plans';
import dbLib from 'zk-dynamodb-wrapper';

const db = dbLib(config.Region);

export const saveSubscriptions = async (params: {
  users: { [string]: UserData },
}) => {
  const users = params.users;
  const subscriptions = getSubscriptions(params);

  Object.keys(users).forEach(
    async ssn =>
      await saveSubscription({
        user: users[ssn],
        subscription: subscriptions[ssn],
      })
  );
};

const saveSubscription = async (params: {
  user: UserData,
  subscription: Array<Plan>,
}) => {
  const {
    ssn,
    email,
    given_name,
    family_name,
    credits,
    nation,
    unionName,
  } = params.user;

  await db.update({
    TableName: config.Database.Name,
    Key: { ssn: ssn },
    Values: {
      email: email,
      given_name: given_name,
      family_name: family_name,
      credits: credits,
      nation: nation,
      unionName: unionName,
      subscription: params.subscription,
    },
  });
  console.log(`Updated subscription for user ${ssn}.`);
};

export const getSubscriptions = (params: {
  users: { [string]: UserData },
}): { [string]: Subscription } => {
  const { users } = params;

  const af = getPlans({ grouping: 'name', key: 'Akademiska Föreningen' })[
    'Akademiska Föreningen'
  ];
  const trf = getPlans({
    grouping: 'name',
    key: 'Terminsräkningsföreningen',
  })['Terminsräkningsföreningen'];
  const undefinedNation = getPlans({ grouping: 'labels', key: 'nation' })[
    'Undefined Nation'
  ];

  return Object.keys(users).reduce((object, ssn) => {
    const { unionName } = users[ssn];

    return {
      ...object,
      [ssn]: [af.id, trf.id, undefinedNation.id, getUnionPlan(unionName).id],
    };
  }, {});
};

const getUnionPlan = (union: string | [string]): Plan =>
  typeof union === 'string'
    ? getPlans({ grouping: 'labels', key: 'union' })[union]
    : plans.defaultPlan();

const getPlans = (params: {
  grouping: string,
  key: string,
}): { [string]: Plan } =>
  plans
    .specification()
    .filter(plan => plan[params.grouping].indexOf(params.key) > -1)
    .reduce((object, plan) => ({ ...object, [plan.name]: plan }), {});
