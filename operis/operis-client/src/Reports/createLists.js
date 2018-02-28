/* @flow */
import { combineReducers } from 'redux';
import { POST_ROW_SUCCESS, FETCH_ROWS_SUCCESS } from './ReportActions';

const allIds = (state = [], action) => {
  switch (action.type) {
    case FETCH_ROWS_SUCCESS:
      return [...action.payload.map(row => row.id)];
    case POST_ROW_SUCCESS:
      return [...state, action.payload.id];
    default:
      return state;
  }
};

export const getAllIds = state => state.allIds;

export const isReportId = (state, id) =>
  state.allIds.find(compareId => compareId === id);

export const getMonthReports = (state, epoch) => {
  const key = getFirstDayOfMonth(Number(epoch));
  return state.idsByYearMonthEpoch[key] || [];
};

const getFirstDayOfMonth = (date: Number) => {
  const d = new Date(date);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1);
};

export const getAllMonthReported = state =>
  Object.keys(state.idsByYearMonthEpoch);

export default combineReducers({ allIds });
