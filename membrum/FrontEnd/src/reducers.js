/* @flow */

import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import userReducer from './user'
import membersReducer from './admin/membersReducer'
import { membership as membershipReducer } from './membership/membershipReducer'

export type Action = { +type: string, +payload?: Object }
export type GetState = () => State
export type PromiseAction = Promise<Action>
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any
export type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any

export default combineReducers({
  userReducer,
  membershipReducer,
  membersReducer,
  form
})
