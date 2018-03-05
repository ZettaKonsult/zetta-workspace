import { API } from 'aws-amplify';
import { updateObjectArrayState } from '../util/stateUtils';

export const updateInvoiceState = newInvoice => state => {
  const { invoices } = state;
  const newState = {
    ...state,
    invoices: updateObjectArrayState(newInvoice, invoices),
  };
  return newState;
};

export const fetchInvoiceAPI = async companyCustomerId =>
  await API.get('invoice', `/invoice/${companyCustomerId}`, {
    headers: {},
  });

export const saveInvoiceAPI = async (invoice, companyCustomerId) =>
  await API.post('invoice', '/invoice', {
    headers: {},
    body: {
      invoice: {
        ...invoice,
        createdAt: new Date(invoice.createdAt).getTime(),
      },
      companyCustomerId,
    },
  });

export const sendInvoice = async (companyCustomerId, invoiceId) =>
  await API.post('invoice', `/invoice/mail`, {
    header: {},
    body: {
      companyCustomerId,
      invoiceId,
    },
  });
