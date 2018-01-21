/* @flow */
import * as utilDate from 'date-primitive-utils'
import { MEMBERSHIP_UPDATE_PLANS, MEMBERSHIP_PAY } from './membershipActions'
import {
  PLAN_LOAD_FAILURE,
  PLAN_LOAD_REQUEST,
  PLAN_LOAD_SUCCESS,
  PLAN_UPDATE
} from './planActions'
import * as plan from './planReducer'
import type { PlanState } from './planReducer'
import { LOAD_USER_REQUEST, LOAD_USER_SUCCESS } from '../user/profileActions'

type MembershipState = {
  +subscription: string[],
  +plan: PlanState,
  +payments: Object[],
  +isFetching: boolean
}

type Action = {
  type: string,
  payload: Object
}

const initialState = {
  subscription: [],
  plan: plan.reducer(undefined, { type: '' }),
  payments: [],
  isFetching: false
}

export const membership = (
  state: MembershipState = initialState,
  action: Action
): MembershipState => {
  switch (action.type) {
    case PLAN_LOAD_SUCCESS:
    case PLAN_UPDATE:
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
              getPlanById(state, planId)
            )
          }
        ]
      }
    default:
      return state
  }
}

export const getUnpaidPlans = (
  state: MembershipState,
  date: number
): string[] => {
  const payments = getAllPaymentsForInterval(state, date)
  const subscription = getSubscription(state)
  if (payments.length === 0) {
    return subscription
  } else {
    const totalSpecification = payments.reduce(
      (result, payment) => [...result, ...payment.specification],
      []
    )
    const result = subscription.filter(
      planId => totalSpecification.findIndex(plan => plan.id === planId) === -1
    )
    return result
  }
}

export const getPayments = (state: MembershipState) => state.payments

export const isSubscriptionPaid = (state: MembershipState, date: number) =>
  getSubscription(state).length > 0 && getUnpaidPlans(state, date).length === 0

export const getNextPayment = (state: MembershipState, date: number) => ({
  date: getNextPaymentDate(state, date),
  amount: getUnpaidPlans(state, date).reduce(
    (total, planId) => total + getPlanById(state, planId).amount,
    0
  ),
  subscription: getUnpaidPlans(state, date).map(planId =>
    getPlanById(state, planId)
  )
})

export const getNextPaymentDate = (state: MembershipState, date: number) => {
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

const getLastPayment = (state: MembershipState): Object => {
  if (state.payments.length > 0) {
    return state.payments.slice(-1)[0]
  } else {
    return {}
  }
}

export const getAllPaymentsForInterval = (
  state: MembershipState,
  date: number
): Object[] =>
  state.payments.filter(payment => {
    const validUntil = utilDate.incrementToNextLowerBound(
      payment.date,
      payment.specification[0].intervalCount
    )
    return validUntil > date
  })

export const getPlanById = (state: MembershipState, planId: string) =>
  plan.getPlanById(state.plan, planId)

export const getAllPlans = (state: MembershipState) =>
  plan.getAllPlans(state.plan)

export const getPlanOptions = (state: MembershipState) => (planId: string) =>
  plan.getPlanOptions(state.plan)(planId)

export const getSubscription = (state: MembershipState): string[] =>
  state.subscription

export const getDefaultPlan = (state: MembershipState) =>
  plan.getDefaultPlan(state.plan)

export const getIsFetching = (state: MembershipState) => state.isFetching
