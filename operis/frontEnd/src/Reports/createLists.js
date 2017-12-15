import { combineReducers } from 'redux'
import { ADD_REPORT, UPDATE_REPORT_DATE } from './ReportActions'

const allIds = (state = [], action) => {
  switch (action.type) {
    case ADD_REPORT:
      return [...state, action.id]
    default:
      return state
  }
}

export const getAllIds = state => state.allIds

export const isReportId = (state, id) =>
  state.allIds.find(compareId => compareId === id)

const idsByYearMonthEpoch = (state = {}, action) => {
  switch (action.type) {
    case ADD_REPORT:
      const firstDayOfMonth = getFirstDayOfMonth(action.report.date)
      return {
        ...state,
        [firstDayOfMonth]: addToArray(state[firstDayOfMonth], action.id)
      }

    case UPDATE_REPORT_DATE:
      return handleDateUpdate(state, action)

    default:
      return state
  }
}

const handleDateUpdate = (state, action) => {
  const { id, oldDate, newDate } = action
  if (oldDate === newDate) {
    return state
  }
  const oldDateKey = getFirstDayOfMonth(oldDate)
  const oldIndex = state[oldDateKey].findIndex(idDate => idDate === id)
  return {
    ...state,
    [oldDateKey]: [
      ...state[oldDateKey].slice(0, oldIndex),
      ...state[oldDateKey].slice(oldIndex + 1)
    ],
    [newDate]: addToArray(state[newDate], id)
  }
}

const addToArray = (array = [], item) => [...array, item]

const getFirstDayOfMonth = date => {
  const d = new Date(date)
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1)
}

export const getAllMonthReported = state =>
  Object.keys(state.idsByYearMonthEpoch)

export default combineReducers({ allIds, idsByYearMonthEpoch })
