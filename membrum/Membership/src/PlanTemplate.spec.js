import PlanTemplate, { PlanRule } from "./PlanTemplate"
import Plan from "./Plan"

import mockData from "./mockData.spec.json"
const studentlundTemplate = mockData.planRules.filter(
  rule => rule.group === "studentlund"
)

const plansMock = mockData.plans
const nation1 = new Plan(plansMock[15])
const nation2 = new Plan(plansMock[10])
const union = new Plan(plansMock[1])
const trf = new Plan(plansMock[17])
const smalands = new Plan(plansMock[18])

const simpleStudentlundPlans = [trf, union, nation1]
const complexStudentlundPlans = [nation2, union, nation1, trf, smalands]
const simpleNotValidPlans = [union, trf, smalands]
const complexNotValidPlans = []

describe("PlanTemplate", () => {
  describe("getOperator()", () => {
    it("only evaluates correctly", () => {
      const pt = new PlanTemplate(studentlundTemplate)
      const operator = pt.getOperator("only", 1)
      expect(operator(1)).toBeTruthy()
      expect(operator(2)).toBeFalsy()
    })
    it("lessThan evaluates correctly", () => {
      const pt = new PlanTemplate(studentlundTemplate)
      const operator = pt.getOperator("lessThan", 2)
      expect(operator(1)).toBeTruthy()
      expect(operator(2)).toBeFalsy()
    })
    it("moreThan evaluates correctly", () => {
      const pt = new PlanTemplate(studentlundTemplate)
      const operator = pt.getOperator("moreThan", 2)
      expect(operator(3)).toBeTruthy()
      expect(operator(2)).toBeFalsy()
    })
    it("atLeast evaluates correctly", () => {
      const pt = new PlanTemplate(studentlundTemplate)
      const operator = pt.getOperator("atLeast", 2)
      expect(operator(3)).toBeTruthy()
      expect(operator(1)).toBeFalsy()
    })
    it("atMost evaluates correctly", () => {
      const pt = new PlanTemplate(studentlundTemplate)
      const operator = pt.getOperator("atMost", 2)
      expect(operator(2)).toBeTruthy()
      expect(operator(3)).toBeFalsy()
    })
    it("not evaluates correctly", () => {
      const pt = new PlanTemplate(studentlundTemplate)
      const operator = pt.getOperator("none", 1)
      expect(operator(3)).toBeFalsy()
      expect(operator(1)).toBeFalsy()
    })
  })

  describe("evaluatePlan()", () => {
    it("evaluate handles simple case", () => {
      const pt = new PlanTemplate(studentlundTemplate)
      expect(pt.evaluatePlan(simpleStudentlundPlans)).toBeTruthy()
    })
    it("evaluate handles a more complex case", () => {
      const pt = new PlanTemplate(studentlundTemplate)
      expect(pt.evaluatePlan(complexStudentlundPlans)).toBeTruthy()
    })
    it("returns false if the check is not passed", () => {
      const pt = new PlanTemplate(studentlundTemplate)
      expect(pt.evaluatePlan([])).toBeFalsy()
    })
    it("evaluate false for a simple none valid array", () => {
      const pt = new PlanTemplate(studentlundTemplate)
      expect(pt.evaluatePlan(simpleNotValidPlans)).toBeFalsy()
    })
  })

  describe("getErrors()", () => {
    it("returns why the evaluation did not pass, simple example", () => {
      const pt = new PlanTemplate(studentlundTemplate)
      const expected = { nation: ["There should be atLeast 1 nation"] }

      expect(pt.getErrors(simpleNotValidPlans)).toEqual(
        expect.objectContaining(expected)
      )
    })
    it("returns why the evaluation did not pass, complex example", () => {
      const pt = new PlanTemplate(studentlundTemplate)
      const expected = {
        nation: ["There should be atLeast 1 nation"],
        union: ["There should be only 1 union"]
      }

      expect(pt.getErrors(complexNotValidPlans)).toEqual(
        expect.objectContaining(expected)
      )
    })
  })

  describe("filterPlans()", () => {
    it("returns only plans where the value of attribute matches key", () => {
      const pt = new PlanTemplate(studentlundTemplate)
      const result = pt.filterPlans(simpleStudentlundPlans, "id", nation1.id)
      expect(result).toHaveLength(1)
      expect(result).toEqual([nation1])
    })
  })
})
