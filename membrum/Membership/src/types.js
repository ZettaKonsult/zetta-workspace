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
  unionName: string | [string],
  attributes?: { [string]: string }
}

export type Plan = {
  id: string,
  name: string,
  amount?: string,
  interval?: string,
  intervalCount?: string,
  labels: Array<string>,
  group: Array<string>,
  type?: string
}

export type Subscription = Array<Plan>
