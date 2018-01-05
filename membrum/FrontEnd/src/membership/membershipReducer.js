import {
  MEMBERSHIP_ADD_PLAN,
  MEMBERSHIP_REMOVE_PLAN,
  MEMBERSHIP_UPDATE_PLANS,
  MEMBERSHIP_FETCH_REQUEST,
  MEMBERSHIP_FETCH_REQUEST_FAILURE,
  MEMBERSHIP_ALL_PLANS
} from './membershipActions'

const initialState = {
  allPlans: [],
  plans: [],
  paid: false,
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
        plans: [...action.payload.plans]
      }
    case MEMBERSHIP_ALL_PLANS:
      return {
        ...state,
        allPlans: [...action.payload.allPlans]
      }
    default:
      return state
  }
}
