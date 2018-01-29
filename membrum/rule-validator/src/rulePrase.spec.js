import ruleParser from './newFeature';

import mockData from '../mocks/db.js';

const planRules = mockData.plantemplates.filter(
  rule => rule.group === 'studentlund'
);
const unionRule = planRules.find(rule => rule.name === 'unionRule');
const afRule = planRules.find(rule => rule.name === 'afRule');
const plans = mockData.plans;

it('calulate the target value for the rule', () => {
  expect(ruleParser().parseValue(unionRule)).toBe(1);
});

it('returns only 1 option if the rule depends on a id', () => {
  expect(ruleParser().parseOptions(afRule, plans)).toMatchSnapshot();
});
it('returns all selectable values for other attributes', () => {
  expect(ruleParser().parseOptions(unionRule, plans)).toMatchSnapshot();
});

it('returns array with all rules parsed', () => {
  expect(ruleParser(planRules).parseRules(plans)).toMatchSnapshot();
});
