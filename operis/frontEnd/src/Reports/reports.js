import { combineReducers } from 'redux'
import { ADD_REPORT } from './ActionTypes'

const initialState = {
  '1': {
    id: '1',
    workerId: '1',
    date: 1511352724387,
    hours: 2,
    projectId: '1',
    driving: 4,
    extrawork:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, suscipit.',
    extrahours: 1,
    submittedBy: '2'
  },
  '2': {
    id: '2',
    workerId: '2',
    date: 1511352724387,
    hours: 2,
    projectId: '1',
    driving: 4,
    extrawork:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id, suscipit.',
    extrahours: 1,
    submittedBy: '1'
  }
}

const report = (state, action) => {
  switch (action.type) {
    case ADD_REPORT:
      return {
        id: action.id,
        ...action.report
      }
    default:
      return state
  }
}

const byId = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REPORT:
      return { ...state, [action.id]: report(state[action.id], action) }
    default:
      return state
  }
}

const allIds = (state = ['1', '2'], action) => {
  switch (action.type) {
    case ADD_REPORT:
      return [...state, action.id]
    default:
      return state
  }
}

const reports = combineReducers({ byId, allIds })

export default reports

export const getAllReports = state => state.allIds.map(id => state.byId[id])

export const getAllReportsSubmittedBy = (state, id) => {
  const allReports = getAllReports(state)
  return allReports.filter(report => report.submittedBy === id)
}

export const getAllReportsAboutWorker = (state, id) => {
  const allReports = getAllReports(state)
  return allReports.filter(report => report.workerId === id)
}
