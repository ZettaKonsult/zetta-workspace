import {combineReducers} from 'redux'

import {ADD_PLACE, UPDATE_WORKPLACE} from './PlaceActions'

const place = (state, action) => {
  switch (action.type) {
    case ADD_PLACE:
    case UPDATE_WORKPLACE:
      return {
        id: action.id,
        ...action.place
      }
    default:
      return state
  }
}

export const byId = (state = {}, action) => {
  switch (action.type) {
    case ADD_PLACE:
    case UPDATE_WORKPLACE:
      return {
        ...state,
        [action.id]: place(state[action.id], action)
      }
    default:
      return state
  }
}

export const allIds = (state = [], action) => {
  switch (action.type) {
    case ADD_PLACE:
      return [...state, action.id]
    default:
      return state
  }
}

const Places = combineReducers({byId, allIds})
export default Places

export const getPlaces = state => state.allIds.map(id => state.byId[id])

export const getWorkplaceById = (state, id) => state.byId[id]

export const isWorkplaceId = (state, id) =>
  state.allIds.find(compareId => compareId === id)