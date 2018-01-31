/* @flow */

export type Rule = {
  id: string,
  name: string,
  group: string,
  attribute: string,
  key: string,
  func: string,
  value: number,
  error: string,
};

export type validateRuleOptions = {
  sortKey: string,
  alwaysEvaluateGroup: string[],
};
