import Subscription from "./Subscription"
import Plan from "./Plan"

let sub
let planEqual = new Plan({ amount: 100, interval: "month", intervalCount: 6 })
let planEqual1 = new Plan({ amount: 100, interval: "month", intervalCount: 6 })
let planNotEqual = new Plan({ amount: 200, interval: "year", intervalCount: 4 })

beforeEach(() => {
  sub = new Subscription()
})

describe("Subscription", () => {
  describe("addPlan()", () => {
    it("Plan is added", () => {
      expect(sub.addPlan(planEqual)).toBeTruthy()
      expect(sub.getNumberOfPlans()).toBe(1)
    })

    it("Plan is not added when interval is different", () => {
      sub.addPlan(planEqual)

      expect(sub.addPlan(planNotEqual)).toBeFalsy()
      expect(sub.getNumberOfPlans()).toBe(1)
    })

    it("Plan is added when interval is same", () => {
      sub.addPlan(planEqual)
      expect(sub.addPlan(planEqual1)).toBeTruthy()
      expect(sub.getNumberOfPlans()).toBe(2)
    })
  })

  describe("updatePlan()", () => {
    it("Returns false if plan is not in subscription", () => {
      sub.addPlan(planEqual)
      expect(sub.updatePlan(planNotEqual, planEqual1)).toBeFalsy()
      expect(sub.getNumberOfPlans()).toBe(1)
    })

    it("Should swap plan if only one is present", () => {
      sub.addPlan(planEqual)
      expect(sub.updatePlan(planEqual, planNotEqual)).toBeTruthy()
      expect(sub.getNumberOfPlans()).toBe(1)
    })

    it("Should not swap plan in multiplan subscription if interval || intervalCount are different", () => {
      sub.addPlan(planEqual)
      sub.addPlan(planEqual1)
      expect(sub.updatePlan(planEqual, planNotEqual)).toBeFalsy()
      expect(sub.getNumberOfPlans()).toBe(2)
    })
  })

  describe("getTotalPlanCost()", () => {
    it("returns the total cost for one plan", () => {
      sub.addPlan(planEqual)
      expect(sub.getTotalPlanCost()).toEqual(100)
    })

    it("returns the total cost for multiple plans", () => {
      sub.addPlan(planEqual)
      sub.addPlan(planEqual1)
      expect(sub.getTotalPlanCost()).toEqual(200)
    })
  })

  describe("isBillable()", () => {
    const lastPaid = Date.UTC(2017, 2)
    const timeToPay = Date.UTC(2017, 11)
    const notPayDate = Date.UTC(2017, 3)

    describe("not periodical", () => {
      it("true if the payment date + intervalCount has passed", () => {
        sub = new Subscription([planEqual], false, [lastPaid])
        expect(sub.isBillable(timeToPay)).toBeTruthy()
      })
      it("false if the payment date + intervalCount has not passed", () => {
        sub = new Subscription([planEqual], false, [lastPaid])
        expect(sub.isBillable(notPayDate)).toBeFalsy()
      })
    })

    describe("periodical", () => {
      it("true if the payment date has passed the upperBound of the plan intervalCount", () => {
        sub = new Subscription([planEqual], true, [lastPaid])
        expect(sub.isBillable(timeToPay)).toBeTruthy()
      })
      it("false if the payment has not passed upperBound of the plan intervalCount", () => {
        sub = new Subscription([planEqual], true, [lastPaid])
        expect(sub.isBillable(notPayDate)).toBeFalsy()
      })
    })
  })

  describe("getNextPeriodicalPayDate()", () => {
    const paidDate = Date.UTC(2017, 1, 1)

    it("returns the upperbound for the subscription based on interval and intervalConut", () => {
      sub = new Subscription([planEqual], true, [paidDate])
      expect(sub.getNextPayDate()).toBe(Date.UTC(2017, 6, 1))
    })

    it("returns the upperbound for the subscription based on interval and intervalConut", () => {
      const plan = new Plan({ interval: "month", intervalCount: 4 })
      sub = new Subscription([plan], true, [paidDate])
      expect(sub.getNextPayDate()).toBe(Date.UTC(2017, 4, 1))
    })

    it("returns the upperbound for the subscription based on interval and intervalConut", () => {
      const plan = new Plan({ interval: "month", intervalCount: 3 })
      sub = new Subscription([plan], true, [paidDate])
      expect(sub.getNextPayDate()).toBe(Date.UTC(2017, 3, 1))
    })

    it("returns the upperbound for the subscription based on interval and intervalConut", () => {
      const plan = new Plan({ interval: "month", intervalCount: 2 })
      sub = new Subscription([plan], true, [paidDate])
      expect(sub.getNextPayDate()).toBe(Date.UTC(2017, 2, 1))
    })

    it("returns the upperbound for the subscription based on interval and intervalConut", () => {
      const plan = new Plan({ interval: "month", intervalCount: 1 })
      sub = new Subscription([plan], true, [paidDate])
      expect(sub.getNextPayDate()).toBe(Date.UTC(2017, 2, 1))
    })
  })

  describe("getNextSequentialPayDate()", () => {
    const paidDate = Date.UTC(2017, 1, 1)

    it("get epoxTime + 1 day", () => {
      const plan = new Plan({ interval: "day", intervalCount: 1 })
      sub = new Subscription([plan], false, [paidDate])
      expect(sub.getNextSequentialPayDate()).toBe(Date.UTC(2017, 1, 2))
    })

    it("get epoxTime + 1 month", () => {
      const plan = new Plan({ interval: "month", intervalCount: 1 })
      sub = new Subscription([plan], false, [paidDate])
      expect(sub.getNextSequentialPayDate()).toBe(Date.UTC(2017, 2, 1))
    })
    it("get epoxTime + 1 year", () => {
      const plan = new Plan({ interval: "year", intervalCount: 1 })
      sub = new Subscription([plan], false, [paidDate])
      expect(sub.getNextSequentialPayDate()).toBe(Date.UTC(2018, 1, 1))
    })
  })
})
