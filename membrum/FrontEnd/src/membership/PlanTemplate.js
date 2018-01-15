/* @flow */

export default function(rules: Object[]) {
  function evaluatePlan(plans: Object[]) {
    const boolArray = rules.map(rule => getEvaluation(rule, plans))
    return boolArray.reduce((result, bool) => result && bool)
  }

  function getErrors(plans: Object[]) {
    return rules.reduce((errors, rule) => {
      if (!getEvaluation(rule, plans)) {
        let error = errors[rule.key] || []
        return {
          ...errors,
          [rule.key]: [...error, rule.error]
        }
      } else {
        return errors
      }
    }, {})
  }

  function getEvaluation(rule: Object, plans: Object[]) {
    const { attribute, key, func, value } = rule

    const filteredByGroup = filterPlans(plans, 'group', rule.group)
    const filteredByAttribute = filterPlans(filteredByGroup, attribute, key)

    return getOperator(func, Number(value))(filteredByAttribute.length)
  }

  function filterPlans(plans: Object[], attribute: string, key: string) {
    return plans.filter(plan => {
      if (Array.isArray(plan[attribute])) {
        return plan[attribute].find(item => item === key)
      }
      return plan[attribute] === key
    })
  }

  function getOperator(key: string, value: number) {
    const operators = {
      only: (b: number) => (a: number) => a === b,
      lessThan: (b: number) => (a: number) => a < b,
      moreThan: (b: number) => (a: number) => a > b,
      atLeast: (b: number) => (a: number) => a >= b,
      atMost: (b: number) => (a: number) => a <= b,
      none: (b: number) => (a: number) => operators['lessThan'](1)(a)
    }
    return operators[key](value)
  }

  return { evaluatePlan, getOperator, getErrors, filterPlans }
}
