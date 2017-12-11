import { combineReducers } from 'redux'
import byId from './byId'
import createLists, * as fromCreateLists from './createLists'

export default combineReducers({ byId, createLists })

export const isReportId = (state, id) =>
  fromCreateLists.isReportId(state.createLists, id)

export const getAllReports = state =>
  fromCreateLists.getAllIds(state.createLists).map(id => state.byId[id])

export const getReportById = (state, id) => state.byId[id]

export const getAllReportsSubmittedBy = (state, id) => {
  const allReports = getAllReports(state)
  return allReports.filter(report => report.submittedBy === id)
}

export const getAllReportsAboutWorker = (state, id) => {
  const allReports = getAllReports(state)
  return allReports.filter(report => report.workerId === id)
}

export const getMonthlyReports = (state, epoch) => {
  const month = new Date(epoch).getUTCMonth()
  const allReports = getAllReports(state)
  return allReports.filter(
    report => new Date(report.date).getUTCMonth() === month
  )
}

export const getWorkersMonthlyReport = (state, epoch, worker) => {
  const monthReports = getMonthlyReports(state, epoch)
  return monthReports.filter(report => report.worker === worker)
}

export const getWorkplacesForMonth = (state, epoch) => {
  const monthReports = getMonthlyReports(state, epoch)
  return monthReports.reduce((total, report) => [...total, report.place], [])
}

export const getWorkersWorkplacesForMonth = (state, epoch, worker) => {
  const monthReports = getWorkersMonthlyReport(state, epoch, worker)
  return monthReports.reduce((total, report) => [...total, report.place], [])
}

export const getAllMonthReported = state =>
  Object.keys(state.idsByYearMonthEpoch)

export const sumWorkedHours = reports =>
  reports.reduce(
    (total, report) => ({
      hours: total.hours + Number(report.hours),
      extrahours: total.extrahours + Number(report.extrahours)
    }),
    { hours: 0, extrahours: 0 }
  )
