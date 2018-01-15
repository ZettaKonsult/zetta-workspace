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
      createState({ plans: [1] })
    )
  })

  it('handles MEMBERSHIP_REMOVE_PLAN', () => {
    expect(
      membership(createState({ plans: [1] }), membershipRemovePlan(1))
    ).toEqual(createState())
  })

  it('handles MEMBERSHIP_UPDATE_PLANS', () => {
    expect(
      membership(createState({ plans: [1] }), membershipUpdatePlans([2, 3]))
    ).toEqual(createState({ plans: [2, 3], pristine: false }))
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
        plans: [1, 2]
      })

      expect(isSubscriptionPaid(state, date)).toBeTruthy()
    })

    it('should not be valid if none paid plan is added', () => {
      const state = createState({
        pristine: false,
        payments: [{ validUntil: 2, specification: [1] }],
        plans: [1, 2]
      })

      expect(isSubscriptionPaid(state, date)).toBeFalsy()
    })

    it.skip('should not be valid if a not paid dublicate plan is added', () => {
      const state = createState({
        pristine: false,
        payments: [{ validUntil: 2, specification: [1, 2] }],
        plans: [1, 2, 2]
      })

      expect(isSubscriptionPaid(state, date)).toBeFalsy()
    })
  })

  describe('getUnpaidPlans()', () => {
    const date = 1
    it('returns all plans when nothing has been paid', () => {
      const state = createState({ plans: [1, 2] })
      expect(getUnpaidPlans(state)).toEqual([1, 2])
    })

    it('returns only the unpaid when there is a payment', () => {
      const state = createState({
        plans: [1, 2],
        payments: [{ validUntil: 2, specification: [1] }]
      })
      expect(getUnpaidPlans(state, date)).toEqual([2])
    })

    it('handles multiple payments during same interval', () => {
      const state = createState({
        plans: [1, 2, 3],
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
        plans: [1, 2],
        payments: [{ validUntil: 2, specification: [1, 2] }]
      })
      expect(getUnpaidPlans(state, date)).toEqual([1, 2])
    })
  })

  describe('getPlanOptions()', () => {
    let state
    beforeEach(() => {
      state = createState({
        allPlans: [
          { id: '1', labels: [1], group: ['x'] },
          { id: '2', labels: [2], group: ['x'] },
          { id: '3', labels: [3], group: ['y'] },
          { id: '4', labels: [3], group: ['z'] },
          { id: '5', labels: [3], group: ['z'], type: 'trail' }
        ]
      })
    })

    it('returns the plans which have the same group that are not trails', () => {
      expect(getPlanOptions(state)('1')).toEqual([
        state['allPlans'][0],
        state['allPlans'][1]
      ])
    })
    it('returns the plans which have the same label that are not trails', () => {
      expect(getPlanOptions(state)('3')).toEqual([
        state['allPlans'][2],
        state['allPlans'][3]
      ])
    })

    it('only returns when both label and group is all group and labels are matching', () => {
      expect(getPlanOptions(state)('5')).toEqual([
        state['allPlans'][3],
        state['allPlans'][4]
      ])
    })
  })
})

const createState = state => ({
  allPlans: [],
  plans: [],
  payments: [],
  isFetching: false,
  pristine: true,
  ...state
})
