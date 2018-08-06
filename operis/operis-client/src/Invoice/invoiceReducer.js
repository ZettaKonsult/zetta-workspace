import * as api from '../services';

const initalState = {
  invoices: [],
};

const INVOICE_FETCH_PENDING = 'INVOICE_FETCH_PENDING';
const INVOICE_FETCH_SUCCESS = 'INVOICE_FETCH_SUCCESS';
const INVOICE_FETCH_FAILURE = 'INVOICE_FETCH_FAILURE';

const INVOICE_CREATE_PENDING = 'INVOICE_CREATE_PENDING';
const INVOICE_CREATE_SUCCESS = 'INVOICE_CREATE_SUCCESS';
const INVOICE_CREATE_FAILURE = 'INVOICE_CREATE_FAILURE';

export const getInvoices = obj => async dispath => {
  dispath({
    type: INVOICE_FETCH_PENDING,
  });

  const invoices = await api.getInvoices(obj);

  dispath({
    type: INVOICE_FETCH_SUCCESS,
    payload: { invoices },
  });
};

export const createInvoice = invoice => async dispatch => {
  dispatch({
    type: INVOICE_CREATE_PENDING,
  });
  const result = await api.createInvoice(invoice);

  dispatch({
    type: INVOICE_CREATE_SUCCESS,
    payload: {
      invoice: result,
    },
  });
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case INVOICE_FETCH_SUCCESS:
      return {
        ...state,
        invoices: [...state.invoices, ...action.payload.invoices],
      };
    case INVOICE_CREATE_SUCCESS:
      const invoice = action.payload.invoice;
      return {
        invoices: [...state.invoices.filter(r => r.id !== invoice.id), invoice],
      };
    default:
      return state;
  }
};

export default reducer;
