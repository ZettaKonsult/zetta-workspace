/* @flow */

/**
 * @date 2018-01-17
 */

import type { NameTuple, UserData, UserDataWithNames } from '../types'

type StringTransformer = string => string

export const changeName = (params: {
  user: UserData,
  formats: Array<string>
}): UserData => {
  const { user, formats } = params
  let { family_name, given_name } = applyFormatting({
    user: user,
    formats: formats
  })

  let newUser = { ...user, family_name: family_name, given_name: given_name }
  delete newUser.name
  return newUser
}

const applyFormatting = (params: {
  user: UserData,
  formats: Array<string>
}): NameTuple => {
  const split = splitName({ user: params.user })
  const formatters = formatsByName({ keys: params.formats })
  return formatters.reduce(
    (names, formatter) => ({
      given_name: formatter(names.given_name),
      family_name: formatter(names.family_name)
    }),
    { given_name: split.given_name, family_name: split.family_name }
  )
}

const formatsByName = (params: {
  keys: Array<string>
}): Array<StringTransformer> => {
  const { keys } = params

  const formats = {
    lowerCase: (str: string): string => str.toLowerCase(),
    capitalizeFirst: (str: string): string =>
      str.charAt(0).toUpperCase() + str.slice(1)
  }

  const formatKeys = keys.indexOf('all') > -1 ? Object.keys(formats) : keys

  return formatKeys.reduce((array, key) => [...array, formats[key]], [])
}

const splitName = (params: { user: UserData }): UserDataWithNames => {
  const { user } = params
  const { name } = user

  if (name == null || name.replace(/\s/g, '').length === 0) {
    throw new Error(`No name for the user ${user.ssn}.`)
  }

  const split = name.split(' ')
  const given_name = split[0]
  const family_name = split[1]

  delete user.name

  return {
    ...user,
    family_name: family_name == null ? '' : family_name,
    given_name: given_name == null ? '' : given_name
  }
}
