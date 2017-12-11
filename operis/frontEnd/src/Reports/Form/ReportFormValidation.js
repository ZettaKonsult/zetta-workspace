import isISO8601 from 'validator/lib/isISO8601'

const isDate = value => (!isISO8601(value) ? 'Must be valid date' : '')
const isRequired = value => (!value ? 'Field required.' : '')

const checks = {
  date: [isRequired, isDate],
  worker: [isRequired],
  place: [isRequired],
  hours: [isRequired]
}

export default values => {
  let errors = {}
  Object.keys(checks).forEach(key => {
    let result = checkValues(values[key], checks[key])
    if (typeof result === 'string') {
      errors[key] = result
    }
  })
  return errors
}

const checkValues = (value, checks) =>
  checks.reduce((total, check) => {
    if (!!total) {
      return total
    }
    return check(value)
  }, '')
