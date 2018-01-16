/* @flow */

/**
 * @date 2018-01-16
 */

export type UserData = {
  ssn: string,
  email: string,
  credits: { [string]: string },
  name?: string,
  family_name?: string,
  given_name?: string,
  nation?: string,
  union?: string | [string],
  attributes?: { [string]: string }
}

export type Subscription = {
  planId: string
}

export type UnionPlan = {
  id: string,
  name: string,
  amount: string,
  interval: string,
  intervalCount: string,
  labels: Array<string>,
  group: Array<string>
}
