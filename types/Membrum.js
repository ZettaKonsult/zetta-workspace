/* @flow */

export type Plan = {
  +id: string,
  +name: string,
  +amount: number,
  +interval: 'month' | 'year',
  +intervalCount: number,
  +labels: string[],
  +group: string[],
  +type: ?string,
  +createdAt: number,
  updatedAt: number,
  updatedTo: ?string,
};

export type Member = {
  +id: string,
  +createdAt: number,
  subscription: string[],
  payment: string[],
};
