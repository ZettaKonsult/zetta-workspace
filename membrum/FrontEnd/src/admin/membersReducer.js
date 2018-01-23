/* @flow */
import {
  MEMBERS_FETCH_FAILURE,
  MEMBERS_FETCH_SUCCESS,
  MEMBERS_FETCH_REQUEST
} from './membersActions'

import type { Action } from '../reducers'

type State = {
  byId: Object,
  allIds: string[],
  isFetching: boolean
}
const initialState = {
  byId: {},
  allIds: [],
  isFetching: false
}

const membersReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case MEMBERS_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case MEMBERS_FETCH_SUCCESS:
      return {
        ...state,
        byId: action.payload.reduce(
          (total, member) => ({ ...total, [member.ssn]: member }),
          {}
        ),
        allIds: [...action.payload.map(member => member.ssn)],
        isFetching: false
      }
    case MEMBERS_FETCH_FAILURE:
      return {
        ...state,
        byId: action.payload,
        isFetching: false
      }
    default:
      return state
  }
}

export const getVisibleMembers = (state: State, value: string): Object[] => {
  const visibleIds = state.allIds.filter(
    id => !!state.byId[id].ssn.includes(value)
  )
  return visibleIds.map(id => state.byId[id])
}

export default membersReducer
