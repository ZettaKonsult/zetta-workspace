import * as utilDate from 'date-primitive-utils'

import {
  MEMBERSHIP_ADD_PLAN,
  MEMBERSHIP_REMOVE_PLAN,
  MEMBERSHIP_UPDATE_PLANS,
  MEMBERSHIP_FETCH_REQUEST,
  MEMBERSHIP_FETCH_REQUEST_FAILURE,
  MEMBERSHIP_ALL_PLANS,
  MEMBERSHIP_PAY,
  MEMBERSHIP_FETCH_SUCCESS
} from './membershipActions'

const initialState = {
  allPlans: [],
  plans: [],
  payments: [],
  pristine: true,
  isFetching: false
}

export const membership = (state = initialState, action) => {
  switch (action.type) {
    case MEMBERSHIP_ADD_PLAN:
      return {
        ...state,
        plans: [...state.plans, action.payload.plan]
      }
    case MEMBERSHIP_REMOVE_PLAN:
      return {
        ...state,
        plans: [...state.plans.filter(plan => plan !== action.payload.plan)]
      }
    case MEMBERSHIP_UPDATE_PLANS:
      return {
        ...state,
        plans: [...action.payload.plans],
        pristine: false
      }
    case MEMBERSHIP_ALL_PLANS:
      return {
        ...state,
        allPlans: [...action.payload.allPlans]
      }

    case MEMBERSHIP_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case MEMBERSHIP_FETCH_SUCCESS:
    case MEMBERSHIP_FETCH_REQUEST_FAILURE:
      return {
        ...state,
        isFetching: false
      }

    case MEMBERSHIP_PAY:
      return {
        ...state,
        pristine: true,
        payments: [...state.payments, action.payload]
      }
    default:
      return state
  }
}

const getUnpaidPlans = state => {
  const { specification } = getLatestPayment(state)
  return state.plans.filter(planId => !specification.find(id => id === planId))
}

export const getLatestPayment = state =>
  state.payments.length > 0 ? state.payments.slice(-1)[0] : undefined

export const getPayments = state => state.payments

export const isSubscriptionPaid = (state, date) => {
  const payment = getLatestPayment(state)
  if (payment === undefined) {
    return false
  }
  if (state.pristine) {
    return payment.validUntil > date
  }

  return getUnpaidPlans(state).length === 0
}

export const getNextPayment = state => {
  if (state.pristine || state.payments.length === 0) {
    return {
      date: getNextPaymentDate(state),
      amount: state.plans.reduce(
        (total, planId) => total + Number(getPlanDetails(state)(planId).amount),
        0
      ),
      plans: state.plans
    }
  }

  return {
    date: getNextPaymentDate(state),
    amount: state.plans.reduce(
      (total, planId) => total + Number(getPlanDetails(state)(planId).amount),
      0
    ),
    plans: getUnpaidPlans(state)
  }
}

export const getPlanDetails = state => id =>
  state.allPlans.find(plan => plan.id === id)

export const getNextPaymentDate = state => {
  if (state.payments.length === 0) {
    return Date.now()
  }

  const { interval, intervalCount } = getPlanDetails(state)(state.plans[0])

  if (interval === 'month') {
    const result = utilDate.incrementToNextLowerBound(
      getLatestPayment(state).date,
      intervalCount
    )
    return result
  }
}
