import { combineReducers } from 'redux'

import { ADD_REPORT, UPDATE_REPORT } from './ReportActions'

const report = (state, action) => {
  switch (action.type) {
    case ADD_REPORT:
    case UPDATE_REPORT:
      return {
        id: action.id,
        ...action.report
      }
    default:
      return state
  }
}

export const byId = (state = {}, action) => {
  switch (action.type) {
    case ADD_REPORT:
    case UPDATE_REPORT:
      return {
        ...state,
        [action.id]: report(state[action.id], action)
      }
    default:
      return state
  }
}

export const allIds = (state = [], action) => {
  switch (action.type) {
    case ADD_REPORT:
      return [...state, action.id]
    default:
      return state
  }
}

const reports = combineReducers({ byId, allIds })
export default reports

export const isReportId = (state, id) =>
  state.allIds.find(compareId => compareId === id)

export const getAllReports = state => state.allIds.map(id => state.byId[id])

export const getReportById = (state, id) => state.byId[id]

export const getAllReportsSubmittedBy = (state, id) => {
  const allReports = getAllReports(state)
  return allReports.filter(report => report.submittedBy === id)
}

export const getAllReportsAboutWorker = (state, id) => {
  const allReports = getAllReports(state)
  return allReports.filter(report => report.workerId === id)
}
