import { getPlanById } from './membershipReducer'

export const MEMBERSHIP_UPDATE_PLANS = 'MEMBERSHIP_UPDATE_PLANS'

export const MEMBERSHIP_PAY = 'MEMBERSHIP_PAY'

export const membershipUpdatePlans = plans => ({
  type: MEMBERSHIP_UPDATE_PLANS,
  payload: {
    plans
  }
})

export const membershipPay = plans => {
  const date = Date.now()
  return {
    type: MEMBERSHIP_PAY,
    payload: {
      date,
      specification: plans
    }
  }
}

export const membershipSave = plans => (dispatch, getState) => {
  const { membershipReducer } = getState()
  const result = plans.filter(
    plan => getPlanById(membershipReducer, plan).type !== 'default'
  )

  dispatch(membershipUpdatePlans(result))
}
