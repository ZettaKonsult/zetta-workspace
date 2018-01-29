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
const trfPlans = [trf, smalands];
const notValidPlans = [union, trf, smalands];

describe('PlanTemplate', () => {
  let pt;
  beforeEach(() => {
    pt = PlanTemplate(planTempaltes, { sortKey: 'group' });
  });

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
  it('none evaluates correctly', () => {
    const operator = pt.getOperator('none', 1);
    expect(operator(3)).toBeFalsy();
    expect(operator(1)).toBeFalsy();
  });

  it('evaluate handles simple case', () => {
    expect(pt.evaluatePlan(simpleStudentlundPlans)).toBeTruthy();
  });
  it('evaluate handles a more complex case', () => {
    expect(pt.evaluatePlan(complexStudentlundPlans)).toBeTruthy();
  });
  it('evaluate only evaluates rule for present plans', () => {
    expect(pt.evaluatePlan(trfPlans)).toBeTruthy();
  });
  it('returns true there is nothing to evaluate', () => {
    expect(pt.evaluatePlan([])).toBeTruthy();
  });
  it('evaluate false for a simple none valid array', () => {
    expect(pt.evaluatePlan(notValidPlans)).toBeFalsy();
  });

  it('evaluates all rules if no sortKey is provided', () => {
    let pt = PlanTemplate(planTempaltes);
    expect(pt.evaluatePlan(simpleStudentlundPlans)).toBeFalsy();
  });

  it('getErrors() returns why the evaluation did not pass', () => {
    const expected = ['7', 'nation'];
    const result = pt.getErrors(notValidPlans);
    expect(Object.keys(result)).toEqual(expected);
  });

  it('filterPlans() returns only plans where the value of attribute matches key', () => {
    const result = pt.filterPlans(simpleStudentlundPlans, 'id', nation2.id);

    expect(result).toHaveLength(1);
    expect(result).toEqual([nation2]);
  });
});
