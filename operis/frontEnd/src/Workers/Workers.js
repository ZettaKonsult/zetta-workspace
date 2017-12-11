import { combineReducers } from 'redux'

import { ADD_WORKER } from './WorkerActions'

const worker = (state, action) => {
  switch (action.type) {
    case ADD_WORKER:
      return {
        id: action.id,
        ...action.worker
      }
    default:
      return state
  }
}

export const byId = (state = {}, action) => {
  switch (action.type) {
    case ADD_WORKER:
      return {
        ...state,
        [action.id]: worker(state[action.id], action)
      }
    default:
      return state
  }
}

export const allIds = (state = [], action) => {
  switch (action.type) {
    case ADD_WORKER:
      return [...state, action.id]
    default:
      return state
  }
}

const reports = combineReducers({ byId, allIds })
export default reports

export const getWorkers = state => state.allIds.map(id => state.byId[id])

export const getWorkerName = (state, id) => state.byId[id].name
