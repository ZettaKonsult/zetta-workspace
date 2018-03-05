import { API } from 'aws-amplify';

export const updateInvoiceState = newInvoice => state => {
  const { invoices } = state;
  const index = invoices.findIndex(invoice => invoice.id === newInvoice.id);
  const newState =
    index === -1
      ? { ...state, invoices: [...invoices, newInvoice] }
      : {
          ...state,
          invoices: [
            ...invoices.slice(0, index),
            newInvoice,
            ...invoices.slice(index + 1),
          ],
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
