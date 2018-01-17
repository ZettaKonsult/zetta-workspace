/* @flow */

/**
 * @date 2018-01-16
 */

import type { Subscription, UnionPlan, UserData } from '../types'
import specification from './plans'

export const getSubscriptions = (params: {
  users: { [string]: UserData }
}): { [string]: Subscription } => {
  const { users } = params

  const unionPlans = getUnionPlans()

  return Object.keys(users).reduce((object, ssn) => {
    const user = users[ssn]
    return {
      ...object,
      [user.ssn]: unionPlans[user.union]
    }
  }, {})
}

const getUnionPlans = (): { [string]: UnionPlan } =>
  specification.plans
    .filter(plan => plan.labels.indexOf('union') > -1)
    .reduce((object, plan) => ({ ...object, [plan.name]: plan }), {})
