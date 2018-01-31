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

export type RuleOptions = {
  sortKey: string,
  alwaysEvaluateGroups: string[],
};
