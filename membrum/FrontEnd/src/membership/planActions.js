import db from '../mocks/db'

export const PLAN_LOAD_REQUEST = 'PLAN_LOAD_REQUEST'
export const PLAN_LOAD_SUCCESS = 'PLAN_LOAD_SUCCESS'
export const PLAN_LOAD_FAILURE = 'PLAN_LOAD_FAILURE'

export const planLoadRequest = () => ({
  type: PLAN_LOAD_REQUEST
})

export const planLoadSuccess = plans => ({
  type: PLAN_LOAD_SUCCESS,
  payload: { plans }
})

export const planLoadFailure = error => ({
  type: PLAN_LOAD_FAILURE,
  payload: { error }
})

export const fetchAllPlans = () => async dispatch => {
  dispatch(planLoadRequest())

  try {
    const plans = await db.plans
    dispatch(planLoadSuccess(plans))
  } catch (error) {
    dispatch(planLoadFailure(error))
  }
}
