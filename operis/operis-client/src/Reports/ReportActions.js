import { v4 } from 'uuid';
import { API } from 'aws-amplify';
import { getReportById } from '../reducers';

export const ADD_REPORT = 'ADD_REPORT';
export const UPDATE_REPORT = 'UPDATE_REPORT';
export const UPDATE_REPORT_DATE = 'UPDATE_REPORT_DATE';

export const FETCH_ROWS_PENDING = 'FETCH_ROWS_PENDING';
export const FETCH_ROWS_SUCCESS = 'FETCH_ROWS_SUCCESS';
export const FETCH_ROWS_FAILURE = 'FETCH_ROWS_FAILURE';

export const POST_ROW_PENDING = 'POST_ROW_PENDING';
export const POST_ROW_SUCCESS = 'POST_ROW_SUCCESS';
export const POST_ROW_FAILURE = 'POST_ROW_FAILURE';

const fetchAllRowsPending = () => ({
  type: FETCH_ROWS_PENDING,
});
const fetchAllRowsSuccess = payload => ({
  type: FETCH_ROWS_SUCCESS,
  payload,
});
const fetchAllRowsFailure = payload => ({
  type: FETCH_ROWS_FAILURE,
  payload,
});

export const fetchAllInvoiceRows = () => async dispatch => {
  dispatch(fetchAllRowsPending());

  try {
    const { Items } = await API.get(
      'invoice',
      '/billrows/cjdvmtzgd000104wgiubpx9ru',
      {
        headers: {},
      }
    );
    dispatch(fetchAllRowsSuccess(Items));
  } catch (err) {
    dispatch(fetchAllRowsFailure(err.message));
  }
};

const postRowPending = () => ({
  type: POST_ROW_PENDING,
});
const postRowSuccess = row => ({
  type: POST_ROW_SUCCESS,
  payload: row,
});
const postRowFailure = err => ({
  type: POST_ROW_FAILURE,
  payload: err,
});

export const postInvoiceRow = invoiceRow => async dispatch => {
  dispatch(postRowPending());
  try {
    const result = await API.post('invoice', '/billrow', {
      headers: {},
      body: {
        ...invoiceRow,
        companyCustomerId: 'cjdvmtzgd000104wgiubpx9ru',
        intervalCount: 'once',
      },
    });
    dispatch(postRowSuccess(result));
  } catch (err) {
    dispatch(postRowFailure(err.message));
  }
};

export const addReport = report => ({
  type: ADD_REPORT,
  id: v4(),
  report,
});

export const updateReport = report => (dispatch, getState) => {
  const oldReport = getReportById(getState(), report.id);
  dispatch(changeReport(report));
  let oldDate = new Date(oldReport.date);
  let newDate = new Date(report.date);
  if (!compareDate(oldDate, newDate)) {
    dispatch(changeReportDate(report.id, oldDate.getTime(), newDate.getTime()));
  }
};
const changeReport = report => ({
  type: UPDATE_REPORT,
  id: report.id,
  report,
});

const changeReportDate = (id, oldDate, newDate) => ({
  type: UPDATE_REPORT_DATE,
  id,
  oldDate,
  newDate,
});

const compareDate = (date1, date2) =>
  Date.UTC(date1.getUTCFullYear(), date1.getUTCMonth(), 1) ===
  Date.UTC(date2.getUTCFullYear(), date2.getUTCMonth(), 1);
