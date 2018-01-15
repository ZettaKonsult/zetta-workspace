import db from '../mocks/db.js'
import * as utilDate from 'date-primitive-utils'
import { getPlanDetails } from './membershipReducer'

export const MEMBERSHIP_ADD_PLAN = 'MEMBERSHIP_ADD_PLAN'
export const MEMBERSHIP_REMOVE_PLAN = 'MEMBERSHIP_REMOVE_PLAN'
export const MEMBERSHIP_UPDATE_PLANS = 'MEMBERSHIP_UPDATE_PLANS'

export const MEMBERSHIP_ALL_PLANS = 'MEMBERSHIP_ALL_PLANS'

export const MEMBERSHIP_PAY = 'MEMBERSHIP_PAY'

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

export const membershipPay = plans => (dispatch, getState) => {
  const date = Date.now()
  dispatch({
    type: MEMBERSHIP_PAY,
    payload: {
      date,
      specification: plans,
      validUntil: utilDate.incrementToNextLowerBound(
        date,
        getPlanDetails(getState().membershipReducer)(plans[0]).intervalCount
      )
    }
  })
}

export const fetchAllPlans = () => (dispatch, getState) => {
  //TODO extract to isAllPlansFetched
  if (getState().membershipReducer.allPlans.length > 0) {
    return
  }
  const { plans: allPlans } = db
  dispatch({ type: MEMBERSHIP_ALL_PLANS, payload: { allPlans } })
}

export const membershipSave = plans => (dispatch, getState) => {
  const { membershipReducer } = getState()
  const result = plans.filter(
    plan => getPlanDetails(membershipReducer)(plan).type !== 'default'
  )

  dispatch(membershipUpdatePlans(result))
}
