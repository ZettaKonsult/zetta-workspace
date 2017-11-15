/* @flow */

import Plan from "./Plan"
import * as utilDate from "./DateUtility"

export default class Subscription {
  plans: Plan[]
  isPeriodical: boolean
  lastPaid: number
  payments: number[]

  constructor(
    plans: Plan[] = [],
    isPeriodical: boolean = true,
    lastPaid: number = 0,
    payments: number[] = []
  ) {
    this.plans = plans
    this.isPeriodical = isPeriodical
    this.lastPaid = lastPaid
    this.payments = payments
  }

  addPlan = (plan: Plan) => {
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

  updatePlan = (existingPlan: Plan, newPlan: Plan) => {
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

  removePlan = (plan: Plan) => {
    const planIndex = this.findPlanIndex(plan)
    if (planIndex === -1) {
      return false
    }

    this.plans = [
      ...this.plans.slice(0, planIndex),
      ...this.plans.slice(planIndex + 1)
    ]
  }

  isSubscriptionBillable = (
    epoxString: number = new Date().getTime()
  ): boolean => {
    return this.getNextPayDate() < epoxString
  }

  getNextPayDate = (): number => {
    if (!this.isPeriodical) {
      return this.getNextSequentialPayDate()
    } else {
      return this.getNextPeriodicalPayDate()
    }
  }

  getNextSequentialPayDate = (): number => {
    const { interval, intervalCount } = this.plans[0]

    if (interval === "day") {
      return utilDate.incrementDateBy(this.lastPaid, intervalCount)
    }
    if (interval === "month") {
      return utilDate.incrementMonthBy(this.lastPaid, intervalCount)
    }
    if (interval === "year") {
      return utilDate.incrementYearBy(this.lastPaid, intervalCount)
    }
  }

  getNextPeriodicalPayDate = () => {
    const { interval, intervalCount } = this.plans[0]

    if (interval === "month") {
      return utilDate.incrementToNextLowerBound(this.lastPaid, intervalCount)
    }
  }

  getNumberOfPlans = () => this.plans.length

  findPlanIndex = (plan: Plan) => this.plans.findIndex(p => p.id === plan.id)

  getTotalPlanCost = () =>
    this.plans.reduce((total, p2) => total + Number(p2.amount), 0)

  comparePlanInterval = (plan: Plan) => this.plans[0].comparePlanInterval(plan)
}
