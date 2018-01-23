/* @flow */
import db from '../mocks/db'
import type { Action, ThunkAction } from '../reducers'

export const MEMBERS_FETCH_REQUEST = 'MEMBERS_FETCH_REQUEST'
export const MEMBERS_FETCH_SUCCESS = 'MEMBERS_FETCH_SUCCESS'
export const MEMBERS_FETCH_FAILURE = 'MEMBERS_FETCH_FAILURE'

const membersFetchRequest = (): Action => ({
  type: MEMBERS_FETCH_REQUEST
})

const membersFetchSuccess = (members): Action => ({
  type: MEMBERS_FETCH_SUCCESS,
  payload: members
})

const membersFetchFailure = (error): Action => ({
  type: MEMBERS_FETCH_FAILURE,
  payload: error
})

export const membersFetch = (): ThunkAction => async dispatch => {
  dispatch(membersFetchRequest())
  try {
    const members = await db.members
    dispatch(membersFetchSuccess(members))
  } catch (error) {
    dispatch(membersFetchFailure(error))
  }
}
