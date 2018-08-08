import * as api from '../services';
import normalizeResponse from '../util/normalizeResponse';
import intToDecimal from '../util/intToDecimal';
import decimalToInt from '../util/decimalToInt';
import { combineReducers } from 'redux';

const INVOICE_FETCH_PENDING = 'INVOICE_FETCH_PENDING';
const INVOICE_FETCH_SUCCESS = 'INVOICE_FETCH_SUCCESS';
const INVOICE_FETCH_FAILURE = 'INVOICE_FETCH_FAILURE';

const INVOICE_CREATE_PENDING = 'INVOICE_CREATE_PENDING';
const INVOICE_CREATE_SUCCESS = 'INVOICE_CREATE_SUCCESS';
const INVOICE_CREATE_FAILURE = 'INVOICE_CREATE_FAILURE';

const appNormalizeInvoice = invoice =>
  invoice.map(invoice => ({
    ...invoice,
    invoiceRows: invoice.invoiceRows.map(row => ({
      ...row,
      tax: decimalToInt(row.tax),
    })),
  }));

export const fetchInvoices = obj => async dispath => {
  dispath({
    type: INVOICE_FETCH_PENDING,
  });

  const result = await api.getInvoices(obj);

  const appNormalized = appNormalizeInvoice(result);
  dispath({
    type: INVOICE_FETCH_SUCCESS,
    payload: { ...normalizeResponse(appNormalized) },
  });
};

export const createInvoice = invoice => async dispatch => {
  dispatch({
    type: INVOICE_CREATE_PENDING,
  });

  const apiNormalized = {
    ...invoice,
    invoiceRows: Object.values(invoice.invoiceRows).map(row => ({
      ...row,
      tax: intToDecimal(row.tax),
    })),
  };
  const result = await api.createInvoice(apiNormalized);

  const appNormalized = appNormalizeInvoice([result]);

  dispatch({
    type: INVOICE_CREATE_SUCCESS,
    payload: { ...normalizeResponse(appNormalized) },
  });
};

const byIds = (state = {}, action) => {
  switch (action.type) {
    case INVOICE_FETCH_SUCCESS:
    case INVOICE_CREATE_SUCCESS:
      return { ...state, ...action.payload.entities };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case INVOICE_FETCH_SUCCESS:
      return [...state, ...action.payload.result];
    case INVOICE_CREATE_SUCCESS:
      return [
        ...state,
        ...action.payload.result.filter(id => !state.includes(id)),
      ];
    default:
      return state;
  }
};

const reducer = combineReducers({
  byIds,
  allIds,
});

export default reducer;

const getState = state => state.invoice;

export const getInvoiceIds = state => getState(state).allIds;

export const getInvoice = (state, id) => getState(state).byIds[id];

export const getInvoices = (state, id) => {
  const ids = getInvoiceIds(state);
  return ids.map(id => getInvoice(state, id));
};
