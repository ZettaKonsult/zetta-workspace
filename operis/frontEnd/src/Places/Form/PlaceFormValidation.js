const isRequired = value => (!value ? 'Field required.' : '')

const checks = {
  name: [isRequired],
  town: [isRequired]
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
