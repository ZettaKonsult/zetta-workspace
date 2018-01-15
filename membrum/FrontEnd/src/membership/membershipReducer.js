import * as utilDate from 'date-primitive-utils'

import {
  MEMBERSHIP_ADD_PLAN,
  MEMBERSHIP_REMOVE_PLAN,
  MEMBERSHIP_UPDATE_PLANS,
  MEMBERSHIP_ALL_PLANS,
  MEMBERSHIP_PAY
} from './membershipActions'

import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE
} from '../user/authenticationActions'

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

    case LOAD_USER_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case LOAD_USER_SUCCESS:
      return {
        ...state,
        plans: action.payload.user.plans,
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
    return state.plans
  }
  const validPayments = state.payments.filter(
    payment => payment.validUntil > date
  )
  return state.plans.filter(
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
      amount: state.plans.reduce(
        (total, planId) => total + Number(getPlanDetails(state)(planId).amount),
        0
      ),
      plans: state.plans
    }
  }

  return {
    date: getNextPaymentDate(state),
    amount: getUnpaidPlans(state, date).reduce(
      (total, planId) => total + Number(getPlanDetails(state)(planId).amount),
      0
    ),
    plans: getUnpaidPlans(state, date)
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
      getLastPayment(state).date,
      intervalCount
    )
    return result
  }
}

const getLastPayment = state =>
  state.payments.length > 0 && state.payments.slice(-1)[0]

export const getPlanOptions = state => planId => {
  const detailedPlan = getPlanDetails(state)(planId)
  if (detailedPlan.type === 'default') {
    return state.allPlans
  } else {
    return state.allPlans.filter(
      p =>
        detailedPlan.type === 'trail'
          ? trailLogic(p, detailedPlan)
          : planLogic(p, detailedPlan)
    )
  }
}

const trailLogic = (trail, plan) =>
  plan.group.every(group => trail.group.some(g => g === group)) &&
  plan.labels.every(label => trail.labels.some(l => l === label))

const planLogic = (plan1, plan2) => {
  return (
    plan1.type !== 'trail' &&
    (plan2.group.some(group => plan1.group.some(g => g === group)) ||
      plan2.labels.some(label => plan1.labels.some(l => l === label)))
  )
}
