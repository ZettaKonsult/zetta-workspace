import PlanTemplate from './PlanTemplate';

import mockData from '../mocks/db.js';
const planTempaltes = mockData.plantemplates;

const union = mockData.plans[0];
const nation1 = mockData.plans[1];
const nation2 = mockData.plans[2];
const trf = mockData.plans[3];
const af = mockData.plans[4];
const smalands = mockData.plans[5];

const simpleStudentlundPlans = [trf, af, union, nation2];
const complexStudentlundPlans = [nation1, af, union, nation2, trf, smalands];
const simpleNotValidPlans = [union, trf, smalands];
const complexNotValidPlans = [{}];

describe('PlanTemplate', () => {
  const pt = PlanTemplate(planTempaltes);

  describe('getOperator()', () => {
    it('only evaluates correctly', () => {
      const operator = pt.getOperator('only', 1);
      expect(operator(1)).toBeTruthy();
      expect(operator(2)).toBeFalsy();
    });
    it('lessThan evaluates correctly', () => {
      const operator = pt.getOperator('lessThan', 2);
      expect(operator(1)).toBeTruthy();
      expect(operator(2)).toBeFalsy();
    });
    it('moreThan evaluates correctly', () => {
      const operator = pt.getOperator('moreThan', 2);
      expect(operator(3)).toBeTruthy();
      expect(operator(2)).toBeFalsy();
    });
    it('atLeast evaluates correctly', () => {
      const operator = pt.getOperator('atLeast', 2);
      expect(operator(3)).toBeTruthy();
      expect(operator(1)).toBeFalsy();
    });
    it('atMost evaluates correctly', () => {
      const operator = pt.getOperator('atMost', 2);
      expect(operator(2)).toBeTruthy();
      expect(operator(3)).toBeFalsy();
    });
    it('not evaluates correctly', () => {
      const operator = pt.getOperator('none', 1);
      expect(operator(3)).toBeFalsy();
      expect(operator(1)).toBeFalsy();
    });
  });

  describe('evaluatePlan()', () => {
    it('evaluate handles simple case', () => {
      expect(pt.evaluatePlan(simpleStudentlundPlans)).toBeTruthy();
    });
    it('evaluate handles a more complex case', () => {
      expect(pt.evaluatePlan(complexStudentlundPlans)).toBeTruthy();
    });
    it('returns false if the check is not passed', () => {
      expect(pt.evaluatePlan([])).toBeFalsy();
    });
    it('evaluate false for a simple none valid array', () => {
      expect(pt.evaluatePlan(simpleNotValidPlans)).toBeFalsy();
    });
  });

  describe('getErrors()', () => {
    it('returns why the evaluation did not pass, simple example', () => {
      const expected = { nation: ['There should be atLeast 1 nation'] };

      expect(pt.getErrors(simpleNotValidPlans)).toEqual(
        expect.objectContaining(expected)
      );
    });
    it('returns why the evaluation did not pass, complex example', () => {
      const expected = {
        nation: ['There should be atLeast 1 nation'],
        union: ['There should be only 1 union'],
      };

      expect(pt.getErrors(complexNotValidPlans)).toEqual(
        expect.objectContaining(expected)
      );
    });
  });

  describe('filterPlans()', () => {
    it('returns only plans where the value of attribute matches key', () => {
      const result = pt.filterPlans(simpleStudentlundPlans, 'id', nation2.id);
      expect(result).toHaveLength(1);
      expect(result).toEqual([nation2]);
    });
  });
});
