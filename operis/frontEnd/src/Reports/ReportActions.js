import { v4 } from 'uuid'

export const ADD_REPORT = 'ADD_REPORT'
export const UPDATE_REPORT = 'UPDATE_REPORT'

export const addReport = report => ({
  type: ADD_REPORT,
  id: v4(),
  report
})

export const updateReport = report => ({
  type: UPDATE_REPORT,
  id: report.id,
  report
})
