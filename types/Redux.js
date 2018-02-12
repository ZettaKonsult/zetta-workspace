/* @flow */

export type Action = { +type: string, +payload?: Object };

export type GetState = () => State;

export type PromiseAction = Promise<Action>;

export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

export type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any;

export type State = Object;
