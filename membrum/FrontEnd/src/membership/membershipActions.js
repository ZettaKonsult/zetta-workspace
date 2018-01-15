import * as utilDate from 'date-primitive-utils'
import { getPlanById } from './membershipReducer'

export const MEMBERSHIP_ADD_PLAN = 'MEMBERSHIP_ADD_PLAN'
export const MEMBERSHIP_REMOVE_PLAN = 'MEMBERSHIP_REMOVE_PLAN'
export const MEMBERSHIP_UPDATE_PLANS = 'MEMBERSHIP_UPDATE_PLANS'

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
        getPlanById(getState().membershipReducer)(plans[0]).intervalCount
      )
    }
  })
}

export const membershipSave = plans => (dispatch, getState) => {
  const { membershipReducer } = getState()
  const result = plans.filter(
    plan => getPlanById(membershipReducer)(plan).type !== 'default'
  )

  dispatch(membershipUpdatePlans(result))
}
