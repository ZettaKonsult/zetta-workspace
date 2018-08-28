import * as api from '../services';
import normalizeResponse from '../util/normalizeResponse';
import intToDecimal from '../util/intToDecimal';
import decimalToInt from '../util/decimalToInt';

export const INVOICE_FETCH_PENDING = 'INVOICE_FETCH_PENDING';
export const INVOICE_FETCH_SUCCESS = 'INVOICE_FETCH_SUCCESS';
export const INVOICE_FETCH_FAILURE = 'INVOICE_FETCH_FAILURE';

export const INVOICE_CREATE_PENDING = 'INVOICE_CREATE_PENDING';
export const INVOICE_CREATE_SUCCESS = 'INVOICE_CREATE_SUCCESS';
export const INVOICE_CREATE_FAILURE = 'INVOICE_CREATE_FAILURE';

export const fetchInvoices = id => async dispath => {
  dispath({
    type: INVOICE_FETCH_PENDING,
  });

  const result = await api.getInvoices(id);

  const appNormalized = appNormalizeInvoice(result);
  dispath({
    type: INVOICE_FETCH_SUCCESS,
    payload: { ...normalizeResponse(appNormalized) },
  });
};

export const createInvoice = invoice => async (dispatch, getState) => {
  const apiNormalized = {
    ...invoice,
    recipientIds: [invoice.recipientIds],
    invoiceRows: Object.values(invoice.invoiceRows).map(row => ({
      ...row,
      tax: intToDecimal(row.tax),
    })),
  };
  const payload = {
    ...apiNormalized,
  };
  dispatch({
    type: INVOICE_CREATE_PENDING,
    payload,
  });

  const result = await api.createInvoice(payload);

  const appNormalized = appNormalizeInvoice([result]);

  dispatch({
    type: INVOICE_CREATE_SUCCESS,
    payload: { ...normalizeResponse(appNormalized) },
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
