import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'

import reports, * as fromReports from './Reports/ReportsReducer'
import workers, * as fromWorkers from './Workers/WorkersReducer'
import places, * as fromPlaces from './Places/PlacesReducer'

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

export const getWorkersMonthlyReport = (state, epoch, worker) =>
  fromReports.getWorkersMonthlyReport(state.reports, epoch, worker)

export const sumWorkedHours = reports => fromReports.sumWorkedHours(reports)

export const getAllMonthReported = state =>
  fromReports.getAllMonthReported(state.reports)

export const getVisibleWorkers = state =>
  fromWorkers.getVisibleWorkers(state.workers)

export const getPlaces = state => fromPlaces.getPlaces(state.places)

export const getWorkplaceById = (state, id) =>
  fromPlaces.getWorkplaceById(state.places, id)

export const isWorkplaceId = (state, id) =>
  fromPlaces.isWorkplaceId(state.places, id)

export const getWorkerById = (state, id) =>
  fromWorkers.getWorkerById(state.workers, id)

export const isWorkerId = (state, id) =>
  fromWorkers.isWorkerId(state.workers, id)
