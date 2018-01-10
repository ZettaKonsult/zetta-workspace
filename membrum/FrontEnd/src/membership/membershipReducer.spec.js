import { membership } from './membershipReducer'
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
})

const createState = state => ({
  allPlans: [],
  plans: [],
  payments: [],
  isFetching: false,
  pristine: true,
  ...state
})
