import db from '../mocks/db.json'

export const MEMBERSHIP_ADD_PLAN = 'MEMBERSHIP_ADD_PLAN'
export const MEMBERSHIP_REMOVE_PLAN = 'MEMBERSHIP_REMOVE_PLAN'
export const MEMBERSHIP_UPDATE_PLANS = 'MEMBERSHIP_UPDATE_PLANS'

export const MEMBERSHIP_FETCH_REQUEST = 'MEMBERSHIP_FETCH_REQUEST'
export const MEMBERSHIP_FETCH_REQUEST_FAILURE =
  'MEMBERSHIP_FETCH_REQUEST_FAILURE'

export const MEMBERSHIP_ALL_PLANS = 'MEMBERSHIP_ALL_PLANS'

export const membershipAddPlan = plan => ({
  type: MEMBERSHIP_ADD_PLAN,
  payload: {
    plan
  }
})

export const membershipRemovePlan = plan => ({
  type: MEMBERSHIP_REMOVE_PLAN,
  payload: {
    plan
  }
})

export const membershipUpdatePlans = plans => ({
  type: MEMBERSHIP_UPDATE_PLANS,
  payload: {
    plans
  }
})

export const membershipFetchRequest = () => async (dispatch, getState) => {
  const { membershipReducer } = getState()

  //TODO extract to isUserPlansFetched
  if (membershipReducer.isFetching || membershipReducer.plans.length > 0) {
    return
  }
  dispatch({ type: MEMBERSHIP_FETCH_REQUEST })

  try {
    const result = await [18, 1, 17]
    dispatch({
      type: MEMBERSHIP_UPDATE_PLANS,
      payload: {
        plans: result
      }
    })
  } catch (error) {
    dispatch({ type: MEMBERSHIP_FETCH_REQUEST_FAILURE })
  }
}

export const fetchAllPlans = () => (dispatch, getState) => {
  //TODO extract to isAllPlansFetched
  if (getState().membershipReducer.allPlans.length > 0) {
    return
  }
  const { plans: allPlans } = db
  dispatch({ type: MEMBERSHIP_ALL_PLANS, payload: { allPlans } })
}

export const membershipSave = plans => dispatch => {
  dispatch(membershipUpdatePlans(plans))
}

export const membershipAddPlanSafe = () => dispatch => {
  dispatch(membershipAddPlan('17'))
}
