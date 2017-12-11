import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import reports, * as fromReports from './Reports/Reports'
import workers, * as fromWorkers from './Workers/Workers'
import places, * as fromPlaces from './Places/Places'

export default combineReducers({
  reports,
  workers,
  places,
  form: formReducer
})

export const isReportId = (state, id) =>
  fromReports.isReportId(state.reports, id)

export const getAllReports = state => fromReports.getAllReports(state.reports)

export const getAllReportsAboutWorker = (state, id) =>
  fromReports.getAllReportsAboutWorker(state.reports, id)

export const getAllReportsSubmittedBy = (state, id) =>
  fromReports.getAllReportsSubmittedBy(state.reports, id)

export const getReportById = (state, id) =>
  fromReports.getReportById(state.reports, id)

export const getWorkers = state => fromWorkers.getWorkers(state.workers)

export const getWorkerName = state => id =>
  fromWorkers.getWorkerName(state.workers, id)

export const getPlaces = state => fromPlaces.getPlaces(state.places)

export const getWorkersMonthlyReport = (state, epoch, worker) =>
  fromReports.getWorkersMonthlyReport(state.reports, epoch, worker)

export const sumWorkedHours = reports => fromReports.sumWorkedHours(reports)
