/* @flow */
import db from '../mocks/db'

import type { Plan } from './planReducer'

export type Action = {
  +type: string
}

export const PLAN_LOAD_REQUEST = 'PLAN_LOAD_REQUEST'
export const PLAN_LOAD_SUCCESS = 'PLAN_LOAD_SUCCESS'
export const PLAN_LOAD_FAILURE = 'PLAN_LOAD_FAILURE'
export const PLAN_UPDATE = 'PLAN_UPDATE'

export const planLoadRequest = (): Action => ({
  type: PLAN_LOAD_REQUEST
})

export const planLoadSuccess = (plans: Array<Plan>): Action => ({
  type: PLAN_LOAD_SUCCESS,
  payload: { plans }
})

export const planLoadFailure = (error: Action) => ({
  type: PLAN_LOAD_FAILURE,
  payload: { error }
})

export const planUpdate = (plan: Plan) => {
  console.log(plan)
  return {
    type: PLAN_UPDATE,
    payload: plan
  }
}

export const planSave = (plan: Plan) => dispatch => {
  dispatch(planUpdate(plan))
}

export const fetchAllPlans = () => async dispatch => {
  dispatch(planLoadRequest())

  try {
    const plans = await db.plans
    dispatch(planLoadSuccess(plans))
  } catch (error) {
    dispatch(planLoadFailure(error))
  }
}
