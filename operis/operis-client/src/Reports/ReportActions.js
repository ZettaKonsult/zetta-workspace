import { API } from 'aws-amplify';

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

export const fetchAllInvoiceRows = companyCustomerId => async dispatch => {
  dispatch(fetchAllRowsPending());

  try {
    const { Items } = await API.get(
      'invoice',
      `/billrows/${companyCustomerId}`,
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

export const postInvoiceRow = (
  invoiceRow,
  companyCustomerId
) => async dispatch => {
  dispatch(postRowPending());
  try {
    const result = await API.post('invoice', '/billrow', {
      headers: {},
      body: {
        ...invoiceRow,
        companyCustomerId,
        intervalCount: 'once',
      },
    });
    dispatch(postRowSuccess(result));
  } catch (err) {
    dispatch(postRowFailure(err.message));
  }
};

export const combineRows = (
  companyCustomerId,
  invoiceRowIds
) => async dispatch => {
  try {
    const result = await API.post('invoice', '/invoice', {
      header: {},
      body: {
        companyCustomerId,
        invoiceRowIds,
      },
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
