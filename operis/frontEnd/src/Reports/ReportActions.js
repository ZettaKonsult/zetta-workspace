import { v4 } from 'uuid'

export const ADD_REPORT = 'ADD_REPORT'
export const UPDATE_REPORT = 'UPDATE_REPORT'
export const UPDATE_REPORT_DATE = 'UPDATE_REPORT_DATE'

export const addReport = report => ({
  type: ADD_REPORT,
  id: v4(),
  report
})

export const updateReport = report => changeReport(report)

const changeReport = report => ({
  type: UPDATE_REPORT,
  id: report.id,
  report
})

// const changeReportDate = (id, oldDate, newDate) => ({
//   type: UPDATE_REPORT_DATE,
//   id,
//   oldDate,
//   newDate
// })
//
// const compareDate = (date1, date2) =>
//   Date.UTC(date1.getUTCFullYear(), date1.getUTCMonth(), 1) ===
//   Date.UTC(date2.getUTCFullYear(), date2.getUTCMonth(), 1)
