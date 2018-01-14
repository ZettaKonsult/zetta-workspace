/* @flow */

/**
 * 2018-01-12
 */

import type { AttributeData, SignUpData, UnionPartition } from '../types'
import * as User from './'

export const saveUnions = async (users: UnionPartition) => {
  try {
    await User.registerUsers(users.created)
    console.log(`Done registering new users.`)
  } catch (error) {
    console.error(error)
    throw error
  }

  try {
    await User.updateUsers(users.modified)
    console.log(`Done updating users with modified unions.`)
  } catch (error) {
    console.error(error)
    throw error
  }

  try {
    await User.updateUsers(users.decide)
    console.log(`Done updating users with decisions to make.`)
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const buildAttributes = (user: SignUpData): AttributeData => {
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
