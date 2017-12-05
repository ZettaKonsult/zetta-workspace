import { validateSwedishSsn } from 'swedish-ssn'

const isRequired = value => (!value ? 'Field required.' : '')
const isSsn = value =>
  !validateSwedishSsn(value) ? 'Must be a swedish personal number' : ''

const checks = {
  name: [isRequired],
  ssn: [isRequired, isSsn],
  email: [isRequired]
}

export default values => {
  let errors = {}
  Object.keys(checks).map(key => {
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
