export default class Subscription {
  constructor() {
    this.plans = []
    this.startDate = '*-01-01'
  }

  addPlan = plan => {
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

  updatePlan = (existingPlan, newPlan) => {
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

  removePlan = plan => {
    const planIndex = this.findPlanIndex(plan)
    if (planIndex === -1) {
      return false
    }

    this.plans = [
      ...this.plans.slice(0, planIndex),
      ...this.plans.slice(planIndex + 1)
    ]
  }

  //TODO use this.startDate to determine if the subscription should be billed
  isSubscriptionBillable = today => {
    const todayDate = new Date()
    let array = this.startDate.split('/')

    for (let i = 0; i < array.length; i++) {
      if (array[i].inclues('*')) {
        array[i] = array[i].replace('*', todayDate.getFullYear())
      }
    }

    // const startDate = new Date(array[0], array[1], array[2])
  }

  getNumberOfPlans = () => this.plans.length

  findPlanIndex = plan => this.plans.findIndex(p => p.id === plan.id)
  getTotalPlanCost = () =>
    this.plans.reduce((total, p2) => total + Number(p2.amount), 0)

  comparePlanInterval = plan => this.plans[0].comparePlanInterval(plan)
}
