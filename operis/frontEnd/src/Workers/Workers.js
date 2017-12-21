import {combineReducers} from 'redux'

import {ADD_WORKER, UPDATE_WORKER, DELETE_WORKER} from './WorkerActions'

const worker = (state, action) => {
  switch (action.type) {
    case ADD_WORKER:
    case UPDATE_WORKER:
      return {
        id: action.id,
        visible: true,
        ...action.worker
      }
    case DELETE_WORKER:
      return {
        ...state,
        visible: false
      }
    default:
      return state
  }
}

const byId = (state = {}, action) => {
  switch (action.type) {
    case ADD_WORKER:
    case UPDATE_WORKER:
    case DELETE_WORKER:
      return {
        ...state,
        [action.id]: worker(state[action.id], action)
      }

    default:
      return state
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case ADD_WORKER:
      return [...state, action.id]

    default:
      return state
  }
}

export default combineReducers({byId, allIds})

const getWorker = (state, id) =>
  state.byId[id].visible
    ? state.byId[id]
    : {name: 'Worker Removed', ssn: 'deleted', email: 'deleted', visible: false}

export const getWorkers = state => state.allIds.map(id => getWorker(state, id))

export const getVisibleWorkers = state =>
  getWorkers(state).filter(item => item.visible)

export const getWorkerName = (state, id) => getWorker(state, id).name
