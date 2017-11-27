import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import reports, * as fromReports from './Reports/reports'

export default combineReducers({
  reports,
  form: formReducer
})

//TODO reutrn true if id exists
export const isReportId = () => ({})

export const getAllReports = state => fromReports.getAllReports(state.reports)

export const getAllReportsAboutWorker = (state, id) =>
  fromReports.getAllReportsAboutWorker(state.reports, id)

export const getAllReportsSubmittedBy = (state, id) =>
  fromReports.getAllReportsSubmittedBy(state.reports, id)

export const getReportById = (state, id) =>
  fromReports.getReportById(state.reports, id)
