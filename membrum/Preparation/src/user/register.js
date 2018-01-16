/* @flow */

/**
 * @date 2018-01-05
 */

import type { UserData } from '../types'
import { Account } from 'zk-aws-users'
import { config } from '../config'
import { buildAttributes } from './util'
import dbLib from 'zk-dynamodb-wrapper'
import passwordGenerator from 'password-generator'

const db = dbLib(config.Region)

export const registerUsers = (users: { [string]: UserData }): Array<string> => {
  let result = []
  Object.keys(users).forEach(async ssn => {
    await registerUser(users[ssn])
    result.push(ssn)
  })
  return result
}

export const registerUser = async (user: UserData) => {
  const { ssn, credits, union } = user
  const attributes = buildAttributes(user)

  try {
    await Account.signUp({
      userName: ssn,
      names: {
        project: config.Names.project,
        customer: config.Names.customer
      },
      attributes: attributes,
      password: passwordGenerator(
        config.Password.Length,
        config.Password.Pattern
      )
    })
  } catch (error) {
    console.error(error)
    throw error
  }

  try {
    await db.create({
      TableName: config.Database.Users.Name,
      Item: {
        ssn: ssn,
        email: attributes.email,
        given_name: attributes.given_name,
        family_name: attributes.family_name,
        credits: credits,
        union: union
      }
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}
