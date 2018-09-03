import { API } from 'aws-amplify';

//RECIPIENT ENDPOINTS
export const createRecipient = async recipient =>
  API.post('recipients', `/recipient`, {
    body: JSON.stringify(recipient),
  });

export const listRecipients = async () => API.get('recipients', `/recipient`);

export const getRecipient = async ({ companyCustomerId, recipientId }) =>
  API.get(`/recipient/${companyCustomerId}/${recipientId}`);

export const deleteRecipent = async id =>
  API.del('recipients', `/recipient`, {
    body: JSON.stringify({ recipientId: id }),
  });

//INVOICE ENDPOINTS
export const getInvoices = async () => API.get(`invoices`, `/invoice`);

export const createInvoice = async invoice =>
  API.post(`invoices`, '/invoice', {
    body: JSON.stringify(invoice),
  });

export const removeInvoice = async id =>
  API.del(`invoices`, '/invoice', {
    body: JSON.stringify({ invoiceId: id }),
  });

export const sendInvoice = async invoiceId =>
  API.post(`invoices`, '/invoice/mail', {
    body: JSON.stringify(invoiceId),
  });

//COMPANYCUSTOMER ENDPOINT
export const createCompanyCustomer = async payload =>
  API.post(`companycustomer`, '/companycustomer', {
    body: JSON.stringify({ companyCustomer: payload }),
  });

export const getCompanyCustomer = async () =>
  API.get('companycustomer', `/companycustomer`);