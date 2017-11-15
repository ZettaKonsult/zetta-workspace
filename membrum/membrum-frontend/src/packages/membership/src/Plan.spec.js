import Plan from "./Plan"

describe("Plan", () => {
  describe("verifyMonthInterval()", () => {
    it("Return true for correct interval", () => {
      const plan = new Plan({ interval: "month", intervalCount: 3 })
      expect(plan.verifyMonthInterval()).toBeTruthy()
    })

    it("Returns false for incorrect interval", () => {
      const plan = new Plan({ interval: "day" })
      expect(plan.verifyMonthInterval()).toBeFalsy()
    })
  })

  describe("comparePlanInterval()", () => {
    it("Returns true for plan with same interval && intervalCount", () => {
      const plan = new Plan({ interval: "month", intervalCount: 3 })
      const plan2 = new Plan({ interval: "month", intervalCount: 3 })

      expect(plan.comparePlanInterval(plan2)).toBeTruthy()
    })

    it("Returns false for plan with different interval", () => {
      const plan = new Plan({ interval: "day" })
      const plan2 = new Plan({ interval: "month" })

      expect(plan.comparePlanInterval(plan2)).toBeFalsy()
    })

    it("Returns false for plan with different intervalCount", () => {
      const plan = new Plan({ intervalCount: 2 })
      const plan2 = new Plan({ intervalCount: 3 })

      expect(plan.comparePlanInterval(plan2)).toBeFalsy()
    })
  })

  describe("verifyMonthInterval()", () => {
    it("returns false if intervalCount === 5", () => {
      const plan = new Plan({ intervalCount: 5 })
      expect(plan.verifyMonthInterval()).toBeFalsy()
    })

    it("returns false if intervalCount > 6", () => {
      const plan = new Plan({ intervalCount: 7 })
      expect(plan.verifyMonthInterval()).toBeFalsy()
    })

    it("returns true for a correct interval", () => {
      const plan = new Plan({ interval: "month", intervalCount: 2 })
      expect(plan.verifyMonthInterval()).toBeTruthy()
    })
  })
})
