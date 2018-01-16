/* @flow */

/**
 * 2018-01-12
 */

import type { AttributeData, UserData, UnionPartition } from '../types'
import { registerUsers } from './register'
import { updateUsers } from './update'

export const saveUnions = async (users: UnionPartition) => {
  let result = {
    registered: [],
    updated: []
  }

  try {
    result.registered = await registerUsers(users.created)
    console.log(`Done registering new users.`)
  } catch (error) {
    console.error(error)
    throw error
  }

  try {
    result.updated = await updateUsers(users.modified)
    console.log(`Done updating users with modified unions.`)
  } catch (error) {
    console.error(error)
    throw error
  }

  return result
}

export const buildAttributes = (user: UserData): AttributeData => {
  const { ssn, name, email } = user
  let { given_name, family_name } = user

  if (given_name == null) {
    if (family_name == null) {
      if (name == null) {
        throw new Error(`No name for the user ${ssn}.`)
      }

      const split = name.split(' ')
      given_name = split[0]
      family_name = split[1]
    } else {
      given_name = ''
    }
  } else if (family_name == null) {
    family_name = ''
  }

  return {
    birthdate: ssn,
    given_name: given_name,
    family_name: family_name,
    email: email
  }
}
