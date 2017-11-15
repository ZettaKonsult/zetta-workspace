/* @flow */

export default class PlanTemplate {
  template: Object[]

  constructor(template: Object[]) {
    this.template = template
  }

  evaluatePlan(plans: Object[]) {
    const boolArray = this.template.map(rule => this.getEvaluation(rule, plans))
    return boolArray.reduce((result, bool) => result && bool)
  }

  getErrors(plans: Object[]) {
    let errors = {}
    this.template.map(rule => {
      if (!this.getEvaluation(rule, plans)) {
        if (!(rule.key in errors)) {
          errors = { ...errors, [rule.key]: [] }
        }
        errors = {
          ...errors,
          [rule.key]: [...errors[rule.key].slice(), rule.error]
        }
      }
    })
    return errors
  }

  getEvaluation(rule, plans) {
    const { attribute, key, func, value } = rule

    const filteredByGroup = this.filterPlans(plans, "group", rule.group)
    const filteredByAttribute = this.filterPlans(
      filteredByGroup,
      attribute,
      key
    )

    return this.getOperator(func, Number(value))(filteredByAttribute.length)
  }

  filterPlans(plans: Object[], attribute: string, key: string) {
    return plans.filter(plan => {
      if (Array.isArray(plan[attribute])) {
        return plan[attribute].find(item => item === key)
      }
      return plan[attribute] === key
    })
  }

  getOperator(key: string, value: number) {
    const operators = {
      only: (b: number) => (a: number) => a === b,
      lessThan: (b: number) => (a: number) => a < b,
      moreThan: (b: number) => (a: number) => a > b,
      atLeast: (b: number) => (a: number) => a >= b,
      atMost: (b: number) => (a: number) => a <= b,
      none: (b: number) => (a: number) => operators["lessThan"](1)(a)
    }
    return operators[key](value)
  }
}
