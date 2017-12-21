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

export const getAllReportsAboutWorker = (state, workerId) => {
  const allReports = getAllReports(state)
  return allReports.filter(report => report.workerId === workerId)
}

export const getMonthlyReports = (state, epoch) =>
  fromCreateLists.getMonthReports(state.createLists, epoch)

export const getWorkersMonthlyReport = (
  state,
  epoch = false,
  workerId = false
) => {
  let result = getAllReports(state)
  if (epoch) {
    const filter = getMonthlyReports(state, epoch)
    result = result.filter(report => filter.indexOf(report.id) !== -1)
  }

  if (workerId) {
    result = result.filter(report => report.worker === workerId)
  }

  return result
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
  fromCreateLists.getAllMonthReported(state.createLists)

export const sumWorkedHours = reports =>
  reports.reduce(
    (total, report) => ({
      hours: total.hours + Number(report.hours),
      extrahours: total.extrahours + Number(report.extrahours)
    }),
    { hours: 0, extrahours: 0 }
  )
