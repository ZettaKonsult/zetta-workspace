/* @flow */

/**
 * @date 2018-01-17
 */

import type { NameTuple, ParsedUser } from '../types'

type StringTransformer = string => string

export const applyFormatting = (params: {
  user: ParsedUser,
  formats: Array<string>
}): NameTuple =>
  formatsByName({ keys: params.formats }).reduce(
    (names, formatter) => ({
      given_name: formatter(names.given_name),
      family_name: formatter(names.family_name)
    }),
    splitName({ name: params.user.name })
  )

const formatsByName = (params: {
  keys: Array<string>
}): Array<StringTransformer> => {
  const { keys } = params

  const formats = {
    lowerCase: (str: string): string => str.toLowerCase(),
    capitalizeFirst: (str: string): string =>
      str.charAt(0).toUpperCase() + str.slice(1)
  }

  const formatKeys =
    keys.length === 0 || keys.indexOf('all') > -1 ? Object.keys(formats) : keys

  return formatKeys.reduce((array, key) => [...array, formats[key]], [])
}

const splitName = (params: { name: string }): NameTuple => {
  let { name } = params

  if (name == null || name.replace(/\s/g, '').length === 0) {
    throw new Error(`No name for the user.`)
  }

  const split = name.split(' ')
  const given_name = split[0]
  const family_name = split[1]

  return {
    family_name: family_name == null ? '' : family_name,
    given_name: given_name == null ? '' : given_name
  }
}
