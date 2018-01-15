import * as utilDate from 'date-primitive-utils'

import {
  MEMBERSHIP_ADD_PLAN,
  MEMBERSHIP_REMOVE_PLAN,
  MEMBERSHIP_UPDATE_PLANS,
  MEMBERSHIP_PAY
} from './membershipActions'

import {
  PLAN_LOAD_FAILURE,
  PLAN_LOAD_REQUEST,
  PLAN_LOAD_SUCCESS
} from './planActions'
import * as plan from './planReducer'

import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE
} from '../user/authenticationActions'

const initialState = {
  subscription: [],
  plan: undefined,
  payments: [],
  pristine: true,
  isFetching: false
}

export const membership = (state = initialState, action) => {
  switch (action.type) {
    case PLAN_LOAD_FAILURE:
    case PLAN_LOAD_REQUEST:
    case PLAN_LOAD_SUCCESS:
      return {
        ...state,
        plan: plan.reducer(state.plan, action)
      }
    case MEMBERSHIP_ADD_PLAN:
      return {
        ...state,
        subscription: [...state.subscription, action.payload.plan]
      }
    case MEMBERSHIP_REMOVE_PLAN:
      return {
        ...state,
        subscription: [
          ...state.subscription.filter(plan => plan !== action.payload.plan)
        ]
      }
    case MEMBERSHIP_UPDATE_PLANS:
      return {
        ...state,
        subscription: [...action.payload.plans],
        pristine: false
      }

    case LOAD_USER_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case LOAD_USER_SUCCESS:
      return {
        ...state,
        subscription: action.payload.user.plans,
        isFetching: false
      }
    case LOAD_USER_FAILURE:
      return {
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

export const getUnpaidPlans = (state, date) => {
  if (state.payments.length === 0) {
    return state.subscription
  }
  const validPayments = state.payments.filter(
    payment => payment.validUntil > date
  )
  return state.subscription.filter(
    planId =>
      !validPayments.find(payment =>
        payment.specification.find(id => id === planId)
      )
  )
}

export const getPayments = state => state.payments

export const isSubscriptionPaid = (state, date) => {
  const payment = getLastPayment(state)
  if (!payment) {
    return false
  }
  if (state.pristine) {
    return payment.validUntil > date
  }

  return getUnpaidPlans(state, date).length === 0
}

export const getNextPayment = (state, date) => {
  if (state.pristine || state.payments.length === 0) {
    return {
      date: getNextPaymentDate(state),
      amount: state.subscription.reduce(
        (total, planId) => total + Number(getPlanById(state)(planId).amount),
        0
      ),
      subscription: state.subscription
    }
  }

  return {
    date: getNextPaymentDate(state),
    amount: getUnpaidPlans(state, date).reduce(
      (total, planId) => total + Number(getPlanById(state)(planId).amount),
      0
    ),
    subscription: getUnpaidPlans(state, date)
  }
}

export const getNextPaymentDate = state => {
  if (state.payments.length === 0) {
    return Date.now()
  }

  const { interval, intervalCount } = getPlanById(state)(state.subscription[0])

  if (interval === 'month') {
    const result = utilDate.incrementToNextLowerBound(
      getLastPayment(state).date,
      intervalCount
    )
    return result
  }
}

const getLastPayment = state =>
  state.payments.length > 0 && state.payments.slice(-1)[0]

export const getPlanById = state => planId =>
  plan.getPlanById(state.plan)(planId)

export const getPlanOptions = state => planId =>
  plan.getPlanOptions(state.plan)(planId)

export const getSubscription = state => state.subscription
