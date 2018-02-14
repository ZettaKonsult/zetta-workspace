/* @flow */
import type { Rule } from 'types/Rule';

export default function(rules: Rule[]) {
  function parseRules(plans: Object[]) {
    return rules.map(rule => ({
      category: parseCategory(rule, plans),
      value: parseValue(rule),
      options: parseOptions(rule, plans),
    }));
  }

  function parseCategory(rule, plans) {
    if (rule.attribute === 'id') {
      return plans.find(plan => plan.id === rule.key).name;
    } else {
      return rule.key;
    }
  }

  function parseOptions(rule: Rule, plans: Object[]) {
    const { attribute, key } = rule;

    return plans.filter(plan => {
      if (Array.isArray(plan[attribute])) {
        return plan[attribute].some(string => string === key);
      } else {
        return plan[attribute] === key;
      }
    });
  }

  function parseValue(rule: Rule) {
    return rule.value;
  }
  return { parseRules, parseValue, parseOptions };
}
