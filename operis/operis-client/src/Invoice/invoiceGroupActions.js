import * as api from '../services';
import normalizeResponse from '../util/normalizeResponse';
import intToDecimal from '../util/intToDecimal';
import decimalToInt from '../util/decimalToInt';

export const INVOICE_GROUP_FETCH_PENDING = 'INVOICE_GROUP_FETCH_PENDING';
export const INVOICE_GROUP_FETCH_SUCCESS = 'INVOICE_GROUP_FETCH_SUCCESS';
export const INVOICE_GROUP_FETCH_FAILURE = 'INVOICE_GROUP_FETCH_FAILURE';

export const INVOICE_GROUP_CREATE_PENDING = 'INVOICE_GROUP_CREATE_PENDING';
export const INVOICE_GROUP_CREATE_SUCCESS = 'INVOICE_GROUP_CREATE_SUCCESS';
export const INVOICE_GROUP_CREATE_FAILURE = 'INVOICE_GROUP_CREATE_FAILURE';

export const fetchInvoiceGroups = id => async dispath => {
  dispath({
    type: INVOICE_GROUP_FETCH_PENDING,
  });

  const result = await api.getInvoices(id);

  const appNormalized = appNormalizeInvoice(result);
  dispath({
    type: INVOICE_GROUP_FETCH_SUCCESS,
    payload: { ...normalizeResponse(appNormalized) },
  });
};

export const createInvoiceGroup = (name, value) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: INVOICE_GROUP_CREATE_PENDING,
    payload: { name, value },
  });

  const result = await api.createGroup({ name, value });

  dispatch({
    type: INVOICE_GROUP_CREATE_SUCCESS,
    payload: { ...result },
  });
};

export const sendInvoice = invoice => async (dispatch, getState) => {
  api.sendInvoice({
    invoiceId: invoice.id,
  });
};

const appNormalizeInvoice = invoice =>
  invoice.map(invoice => ({
    ...invoice,
    invoiceRows: invoice.invoiceRows.map(row => ({
      ...row,
      tax: decimalToInt(row.tax),
    })),
  }));
