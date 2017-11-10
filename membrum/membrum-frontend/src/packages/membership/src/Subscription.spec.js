import Subscription from './Subscription'
import Plan from './Plan'

describe('Subscription', () => {
  describe('addPlan()', () => {
    it('Plan is added', () => {
      const plan = new Plan()
      const sub = new Subscription()

      expect(sub.addPlan(plan)).toBeTruthy()
      expect(sub.getNumberOfPlans()).toBe(1)
    })

    it('Plan is not added when interval is different', () => {
      const plan = new Plan()
      const plan2 = new Plan({ interval: 'year' })

      const sub = new Subscription()

      expect(sub.addPlan(plan)).toBeTruthy()
      expect(sub.addPlan(plan2)).toBeFalsy()
      expect(sub.getNumberOfPlans()).toBe(1)
    })

    it('Plan is added when interval is same', () => {
      const plan = new Plan()
      const plan2 = new Plan()

      const sub = new Subscription()

      expect(sub.addPlan(plan)).toBeTruthy()
      expect(sub.addPlan(plan2)).toBeTruthy()
      expect(sub.getNumberOfPlans()).toBe(2)
    })
  })

  describe('updatePlan()', () => {
    it('Should swap plan if only one is present', () => {
      const plan1 = new Plan({ interval: '6', intervalCount: 'month' })
      const plan2 = new Plan({ interval: '4', intervalCount: 'month' })

      const sub = new Subscription()

      sub.addPlan(plan1)
      expect(sub.updatePlan(plan1, plan2)).toBeTruthy()
      expect(sub.getNumberOfPlans()).toBe(1)
    })

    it('Should not swap plan in multiplan subscription if interval || intervalCount are different', () => {
      const plan1 = new Plan({ interval: '6', intervalCount: 'month' })
      const plan2 = new Plan({ interval: '6', intervalCount: 'month' })
      const plan3 = new Plan({ interval: '4', intervalCount: 'month' })

      const sub = new Subscription()

      sub.addPlan(plan1)
      sub.addPlan(plan2)
      expect(sub.updatePlan(plan1, plan3)).toBeFalsy()
      expect(sub.getNumberOfPlans()).toBe(2)
    })
  })

  describe('getTotalPlanCost()', () => {
    it('returns the total cost for one plan', () => {
      const plan = new Plan({ amount: '100' })
      const sub = new Subscription()

      sub.addPlan(plan)

      expect(sub.getTotalPlanCost()).toEqual(100)
    })

    it('returns the total cost for multiple plans', () => {
      const plan = new Plan({ amount: '100' })
      const sub = new Subscription()

      sub.addPlan(plan)
      sub.addPlan(plan)

      expect(sub.getTotalPlanCost()).toEqual(200)
    })
  })
})
