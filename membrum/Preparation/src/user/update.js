/* @flow */

/**
 * @date 2018-01-12
 */

import type { UserData } from '../types'
import { buildAttributes } from './util'
import { config } from '../config'
import dbLib from 'zk-dynamodb-wrapper'

const db = dbLib(config.Region)

export const updateUsers = (users: { [string]: SignUpData }) => {
  let result = []
  Object.keys(users).forEach(async ssn => {
    await updateUser(users[ssn])
    result.push(ssn)
  })
  return result
}

export const updateUser = async (user: UserData) => {
  const { ssn, credits, union } = user
  const attributes = buildAttributes(user)

  try {
    await db.update({
      TableName: config.Database.Users.Name,
      Key: { ssn: ssn },
      Values: {
        email: attributes.email,
        given_name: attributes.given_name,
        family_name: attributes.family_name,
        credits: credits,
        unionId: union
      }
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}
