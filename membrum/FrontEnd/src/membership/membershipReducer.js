/* @flow */
import * as utilDate from 'date-primitive-utils'

import { MEMBERSHIP_UPDATE_PLANS, MEMBERSHIP_PAY } from './membershipActions'

import {
  PLAN_LOAD_FAILURE,
  PLAN_LOAD_REQUEST,
  PLAN_LOAD_SUCCESS
} from './planActions'
import * as plan from './planReducer'

import { LOAD_USER_REQUEST, LOAD_USER_SUCCESS } from '../user/profileActions'

const initialState = {
  subscription: [],
  plan: plan.reducer(undefined, {}),
  payments: [],
  isFetching: false
}

export const membership = (state = initialState, action) => {
  switch (action.type) {
    case PLAN_LOAD_SUCCESS:
      return {
        ...state,
        plan: plan.reducer(state.plan, action)
      }

    case MEMBERSHIP_UPDATE_PLANS:
      return {
        ...state,
        subscription: [...action.payload.plans]
      }

    case LOAD_USER_REQUEST:
    case PLAN_LOAD_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case LOAD_USER_SUCCESS:
      return {
        ...state,
        subscription: action.payload.user.subscription,
        isFetching: false
      }

    case PLAN_LOAD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload.error
      }

    case MEMBERSHIP_PAY:
      return {
        ...state,
        payments: [
          ...state.payments,
          {
            ...action.payload,
            specification: action.payload.specification.map(planId =>
              getPlanById(state)(planId)
            )
          }
        ]
      }
    default:
      return state
  }
}

export const getUnpaidPlans = (state, date) => {
  const payments = getAllPaymentsForInterval(state, date)
  const totalSpecification = payments.reduce(
    (result, payment) => [...result, ...payment.specification],
    []
  )
  const subscription = getSubscription(state)
  if (Object.keys(payments).length === 0) {
    return subscription
  } else {
    const result = subscription.filter(
      planId => totalSpecification.findIndex(plan => plan.id === planId) === -1
    )
    return result
  }
}

export const getPayments = state => state.payments

export const isSubscriptionPaid = (state, date) =>
  getSubscription(state).length > 0 && getUnpaidPlans(state, date).length === 0

export const getNextPayment = (state, date) => {
  if (isSubscriptionPaid(state, date)) {
    return {
      date: getNextPaymentDate(state, date),
      amount: state.subscription.reduce(
        (total, planId) => total + Number(getPlanById(state)(planId).amount),
        0
      ),
      subscription: state.subscription.map(planId => getPlanById(state)(planId))
    }
  }

  return {
    date: getNextPaymentDate(state, date),
    amount: getUnpaidPlans(state, date).reduce(
      (total, planId) => total + Number(getPlanById(state)(planId).amount),
      0
    ),
    subscription: getUnpaidPlans(state, date).map(planId =>
      getPlanById(state)(planId)
    )
  }
}

export const getNextPaymentDate = (state, date) => {
  if (!isSubscriptionPaid(state, date)) {
    return date
  }

  const payment = getLastPayment(state)
  const { interval, intervalCount } = payment.specification[0]
  if (interval === 'month') {
    const result = utilDate.incrementToNextLowerBound(
      payment.date,
      intervalCount
    )
    return result
  }
}

const getLastPayment = state =>
  state.payments.length > 0 && state.payments.slice(-1)[0]

export const getAllPaymentsForInterval = (state, date) =>
  state.payments.filter(payment => {
    const validUntil = utilDate.incrementToNextLowerBound(
      payment.date,
      payment.specification[0].intervalCount
    )
    return validUntil > date
  })

export const getPlanById = state => planId =>
  plan.getPlanById(state.plan, planId)

export const getPlanOptions = state => planId =>
  plan.getPlanOptions(state.plan)(planId)

export const getSubscription = state => state.subscription

export const getDefaultPlan = state => plan.getDefaultPlan(state.plan)

export const getIsFetching = state => state.isFetching
