import { membership, isSubscriptionPaid } from './membershipReducer'
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
    it('base case no payments', () => {
      const state = createState()
      expect(isSubscriptionPaid(state)).toBeFalsy()
    })

    it('payment in valid interval', () => {
      const state = createState({
        pristine: true,
        payments: [{ validUntil: 2 }]
      })
      expect(isSubscriptionPaid(state, 1)).toBeTruthy()
    })

    it('should be valid even if a plan has been deleted', () => {
      const state = createState({
        pristine: false,
        payments: [{ validUntil: 2, specification: [1, 2, 3] }],
        plans: [1, 2]
      })

      expect(isSubscriptionPaid(state, 1)).toBeTruthy()
    })

    it('should not be valid if none paid plan is added', () => {
      const state = createState({
        pristine: false,
        payments: [{ validUntil: 2, specification: [1] }],
        plans: [1, 2]
      })

      expect(isSubscriptionPaid(state, 1)).toBeFalsy()
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
