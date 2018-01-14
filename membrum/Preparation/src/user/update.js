/* @flow */

/**
 * @date 2018-01-12
 */

import type { SignUpData } from '../types'
import { buildAttributes } from './util'
import { config } from '../config'
import dbLib from 'zk-dynamodb-wrapper'

import util from 'util'

const db = dbLib(config.Region)

export const updateUsers = (users: { [string]: SignUpData }) =>
  Object.keys(users).forEach(async ssn => await updateUser(users[ssn]))

export const updateUser = async (user: SignUpData) => {
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
