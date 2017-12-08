/* @flow */

import Plan from './Plan'
import * as utilDate from 'date-primitive-utils'

export default class Subscription {
  plans: Plan[]
  isPeriodical: boolean
  payments: number[]

  constructor(
    plans: Plan[] = [],
    isPeriodical: boolean = true,
    payments: number[] = []
  ) {
    this.plans = plans
    this.isPeriodical = isPeriodical
    this.payments = payments
  }

  addPlan(plan: Plan) {
    if (this.plans.length === 0) {
      this.plans = [...this.plans, plan]
      return true
    }

    if (this.comparePlanInterval(plan)) {
      this.plans = [...this.plans, plan]
      return true
    }

    return false
  }

  updatePlan(existingPlan: Plan, newPlan: Plan) {
    const existingPlanIndex = this.findPlanIndex(existingPlan)
    if (existingPlanIndex === -1) {
      return false
    }

    if (this.getNumberOfPlans() > 1 && !this.comparePlanInterval(newPlan)) {
      return false
    }

    this.plans = [
      ...this.plans.slice(0, existingPlanIndex),
      newPlan,
      ...this.plans.slice(existingPlanIndex + 1)
    ]
    return true
  }

  removePlan(plan: Plan) {
    const planIndex = this.findPlanIndex(plan)
    if (planIndex === -1) {
      return false
    }

    this.plans = [
      ...this.plans.slice(0, planIndex),
      ...this.plans.slice(planIndex + 1)
    ]
  }

  isBillable(epoxString: number = new Date().getTime()): boolean {
    return this.getNextPayDate() < epoxString
  }

  getNextPayDate(): number {
    if (this.isPeriodical) {
      return this.getNextPeriodicalPayDate()
    } else {
      return this.getNextSequentialPayDate()
    }
  }

  getNextSequentialPayDate(): number {
    const { interval, intervalCount } = this.plans[0]

    if (interval === 'day') {
      return utilDate.incrementDateBy(this.getLastPaid(), intervalCount)
    }
    if (interval === 'month') {
      return utilDate.incrementMonthBy(this.getLastPaid(), intervalCount)
    }
    if (interval === 'year') {
      return utilDate.incrementYearBy(this.getLastPaid(), intervalCount)
    }
  }

  getNextPeriodicalPayDate() {
    const { interval, intervalCount } = this.plans[0]

    if (interval === 'month') {
      return utilDate.incrementToNextLowerBound(
        this.getLastPaid(),
        intervalCount
      )
    }

    throw new notImplementedError('Not yet implemented')
  }

  getLastPaid(): number {
    return this.payments[this.payments.length - 1]
  }

  getNumberOfPlans(): number {
    return this.plans.length
  }

  findPlanIndex(plan: Plan) {
    return this.plans.findIndex(p => p.id === plan.id)
  }

  getTotalPlanCost() {
    return this.plans.reduce((total, p2) => total + Number(p2.amount), 0)
  }

  comparePlanInterval(plan: Plan) {
    return this.plans.length > 0
      ? this.plans[0].comparePlanInterval(plan)
      : true
  }
}

class notImplementedError extends Error {}
