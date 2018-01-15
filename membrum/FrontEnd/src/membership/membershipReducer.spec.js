import {
  membership,
  isSubscriptionPaid,
  getUnpaidPlans,
  getPlanOptions
} from './membershipReducer'

import db from '../mocks/db.js'

import {
  membershipAddPlan,
  membershipRemovePlan,
  membershipUpdatePlans
} from './membershipActions'

describe('membershipReducer', () => {
  it('returns inititalState', () => {
    expect(membership(undefined, {})).toEqual(createState())
  })

  it('handles MEMBERSHIP_ADD_PLAN', () => {
    expect(membership(createState(), membershipAddPlan(1))).toEqual(
      createState({ subscription: [1] })
    )
  })

  it('handles MEMBERSHIP_REMOVE_PLAN', () => {
    expect(
      membership(createState({ subscription: [1] }), membershipRemovePlan(1))
    ).toEqual(createState())
  })

  it('handles MEMBERSHIP_UPDATE_PLANS', () => {
    expect(
      membership(
        createState({ subscription: [1] }),
        membershipUpdatePlans([2, 3])
      )
    ).toEqual(createState({ subscription: [2, 3], pristine: false }))
  })

  describe('isSubscriptionPaid()', () => {
    const date = 1
    it('base case no payments', () => {
      const state = createState()
      expect(isSubscriptionPaid(state, date)).toBeFalsy()
    })

    it('payment in valid interval', () => {
      const state = createState({
        pristine: true,
        payments: [{ validUntil: 2 }]
      })
      expect(isSubscriptionPaid(state, date)).toBeTruthy()
    })

    it('should be valid even if a plan has been deleted', () => {
      const state = createState({
        pristine: false,
        payments: [{ validUntil: 2, specification: [1, 2, 3] }],
        subscription: [1, 2]
      })

      expect(isSubscriptionPaid(state, date)).toBeTruthy()
    })

    it('should not be valid if none paid plan is added', () => {
      const state = createState({
        pristine: false,
        payments: [{ validUntil: 2, specification: [1] }],
        subscription: [1, 2]
      })

      expect(isSubscriptionPaid(state, date)).toBeFalsy()
    })

    it.skip('should not be valid if a not paid dublicate plan is added', () => {
      const state = createState({
        pristine: false,
        payments: [{ validUntil: 2, specification: [1, 2] }],
        subscription: [1, 2, 2]
      })

      expect(isSubscriptionPaid(state, date)).toBeFalsy()
    })
  })

  describe('getUnpaidPlans()', () => {
    const date = 1
    it('returns all plans when nothing has been paid', () => {
      const state = createState({ subscription: [1, 2] })
      expect(getUnpaidPlans(state)).toEqual([1, 2])
    })

    it('returns only the unpaid when there is a payment', () => {
      const state = createState({
        subscription: [1, 2],
        payments: [{ validUntil: 2, specification: [1] }]
      })
      expect(getUnpaidPlans(state, date)).toEqual([2])
    })

    it('handles multiple payments during same interval', () => {
      const state = createState({
        subscription: [1, 2, 3],
        payments: [
          { validUntil: 2, specification: [1] },
          { validUntil: 2, specification: [2] }
        ]
      })
      expect(getUnpaidPlans(state, date)).toEqual([3])
    })

    it('handles multiple intervals', () => {
      const date = 3
      const state = createState({
        subscription: [1, 2],
        payments: [{ validUntil: 2, specification: [1, 2] }]
      })
      expect(getUnpaidPlans(state, date)).toEqual([1, 2])
    })
  })
})

const createState = state => ({
  subscription: [],
  plan: undefined,
  payments: [],
  isFetching: false,
  pristine: true,
  ...state
})
