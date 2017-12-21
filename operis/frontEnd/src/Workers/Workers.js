import {combineReducers} from 'redux'

import {ADD_WORKER, UPDATE_WORKER, DELETE_WORKER} from './WorkerActions'

const worker = (state, action) => {
  switch (action.type) {
    case ADD_WORKER:
    case UPDATE_WORKER:
      return {
        id: action.id,
        ...action.worker
      }
    default:
      return state
  }
}

const byId = (state = {}, action) => {
  switch (action.type) {
    case ADD_WORKER:
    case UPDATE_WORKER:
      return {
        ...state,
        [action.id]: worker(state[action.id], action)
      }
    case DELETE_WORKER:
      let result = {}
      Object.keys(state).forEach(id => {
        if (id !== action.id) {
          result = {...result, [id]: state[id]}
        }
      })
      return result
    default:
      return state
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case ADD_WORKER:
      return [...state, action.id]
    case DELETE_WORKER:
      return state.filter(id => id !== action.id)
    default:
      return state
  }
}

export default combineReducers({byId, allIds})

export const getWorkers = state => state.allIds.map(id => state.byId[id])

export const getWorkerName = (state, id) => state.byId[id].name
