/* @flow */

/**
 * @date 2018-01-16
 */

import type { Subscription, Plan, UserData } from '../types'
import plans from './plans'

export const getSubscriptions = (params: {
  users: { [string]: UserData }
}): { [string]: Subscription } => {
  const { users } = params

  const af = getPlans({ grouping: 'name', key: 'Akademiska Föreningen' })[
    'Akademiska Föreningen'
  ]
  const trf = getPlans({
    grouping: 'name',
    key: 'Terminsräkningsföreningen'
  })['Terminsräkningsföreningen']
  const undefinedNation = getPlans({ grouping: 'labels', key: 'nation' })[
    'Undefined Nation'
  ]
  const unionPlans = getPlans({ grouping: 'labels', key: 'union' })

  return Object.keys(users).reduce((object, ssn) => {
    const user = users[ssn]

    return {
      ...object,
      [user.ssn]: [af, trf, undefinedNation, unionPlans[checkUnion(user.union)]]
    }
  }, {})
}

const checkUnion = (union: string | [string]): string =>
  typeof union === 'string' ? union : ''

const getPlans = (params: {
  grouping: string,
  key: string
}): { [string]: Plan } =>
  plans
    .specification()
    .filter(plan => plan[params.grouping].indexOf(params.key) > -1)
    .reduce((object, plan) => ({ ...object, [plan.name]: plan }), {})
