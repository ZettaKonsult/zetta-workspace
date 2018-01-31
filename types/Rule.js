/* @flow */

export type Rule = {
  id: string,
  name: string,
  group: string,
  attribute: string,
  key: string,
  func: string,
  value: string,
  error: string,
};

export type RuleOptions = {
  sortKey: string,
  alwaysEvaluateGroups: string[],
};
