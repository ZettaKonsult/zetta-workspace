import { combineReducers } from 'redux';
import {
  INVOICE_FETCH_PENDING,
  INVOICE_FETCH_SUCCESS,
  INVOICE_FETCH_FAILURE,
  INVOICE_CREATE_PENDING,
  INVOICE_CREATE_SUCCESS,
  INVOICE_CREATE_FAILURE,
} from './invoiceActions';

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

const isFetching = (state = false, action) => {
  switch (action.type) {
    case INVOICE_FETCH_PENDING:
      return true;
    case INVOICE_FETCH_SUCCESS:
    case INVOICE_FETCH_FAILURE:
      return false;
    default:
      return state;
  }
};

const errorMessage = (state = null, action) => {
  switch (action.type) {
    case INVOICE_FETCH_FAILURE:
    case INVOICE_CREATE_FAILURE:
      return action.message;
    case INVOICE_FETCH_PENDING:
    case INVOICE_FETCH_SUCCESS:
      return null;
    default:
      return state;
  }
};

const reducer = combineReducers({
  byIds,
  allIds,
  isFetching,
  errorMessage,
});

export default reducer;

const getState = state => state.invoice;

export const getInvoiceIds = state => getState(state).allIds;

export const getInvoice = (state, id) => getState(state).byIds[id];

export const getInvoices = (state, id) => {
  const ids = getInvoiceIds(state);
  return ids.map(id => getInvoice(state, id));
};
