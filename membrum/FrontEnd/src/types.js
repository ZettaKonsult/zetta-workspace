/* @flow */

//Redux types
export type Action = { +type: string, +payload?: Object };

export type GetState = () => State;

export type PromiseAction = Promise<Action>;

export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

export type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any;

export type Plan = {
  +id: string,
  +name: string,
  +amount: number,
  +interval: 'month' | 'year',
  +intervalCount: number,
  +labels: Array<string>,
  +group: Array<string>,
  +type: ?string,
};

export type Payment = {
  +id: string,
  +date: number,
  +specification: Plan[],
};
