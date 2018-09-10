import { API } from 'aws-amplify';

//RECIPIENT ENDPOINTS
export const createRecipient = async recipient =>
  API.post('recipients', `/`, {
    body: JSON.stringify(recipient),
  });

export const listRecipients = async () => API.get('recipients', `/`);

export const getRecipient = async ({ companyCustomerId, recipientId }) =>
  API.get('recipients', `/${recipientId}`);

export const deleteRecipent = async id =>
  API.del('recipients', `/`, {
    body: JSON.stringify({ recipientId: id }),
  });

//INVOICE ENDPOINTS
export const getInvoices = async () => API.get(`invoices`, `/`);

export const createInvoice = async invoice =>
  API.post(`invoices`, '/', {
    body: JSON.stringify(invoice),
  });

export const removeInvoice = async id =>
  API.del(`invoices`, '/', {
    body: JSON.stringify({ invoiceId: id }),
  });

export const sendInvoice = async invoiceId =>
  API.post(`invoices`, '/mail', {
    body: JSON.stringify(invoiceId),
  });
export const lockInvoice = async (invoiceId, invoiceGroupId) =>
  API.put(`invoices`, '/lock', {
    body: JSON.stringify({ invoiceId, invoiceGroupId }),
  });

//INVOICEGROUP ENDPOINTS
export const createGroup = async payload =>
  API.post(`invoices`, '/group', {
    body: JSON.stringify(payload),
  });
export const removeGroup = async payload =>
  API.del(`invoices`, '/group', {
    body: JSON.stringify(payload),
  });
export const listGroups = async () => API.get(`invoices`, '/group');

//COMPANYCUSTOMER ENDPOINT
export const createCompanyCustomer = async payload =>
  API.post(`companycustomer`, '/', {
    body: JSON.stringify({ companyCustomer: payload }),
  });

export const getCompanyCustomer = async () => API.get('companycustomer', `/`);
