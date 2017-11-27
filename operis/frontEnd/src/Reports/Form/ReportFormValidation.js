import isDate from 'validator/lib/isISO8601'

const checkDate = value => isDate(value)
const checkDriving = value => !value || !isNaN(value)
const checkHours = value => !isNaN(value)
const checkExtraHours = value => !value || checkHours(value)
const isRequired = value => (!value ? 'Field required.' : '')

const checks = {
  date: [isRequired, checkDate],
  driving: [checkDriving],
  hours: [isRequired, checkHours],
  extrahours: [checkExtraHours]
}

export default values => {
  let errors = {}
  Object.keys(checks).map(key => {
    let result = checkValues(values[key], checks[key])
    errors[key] = result
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
