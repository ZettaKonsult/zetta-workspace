const rootUrl = 'http://localhost:8080';

//RECIPIENT ENDPOINTS
export const createRecipient = async recipient =>
  fetch(`${rootUrl}/recipient`, {
    method: 'post',
    body: JSON.stringify(recipient),
  }).then(res => res.json());

export const listRecipients = async companyCustomerId =>
  fetch(`${rootUrl}/recipient/${companyCustomerId}`).then(res => res.json());

export const updateRecipient = async () =>
  fetch(`${rootUrl}/recipient`, { method: 'put' }).then(res => res.json());

export const getRecipient = async ({ companyCustomerId, recipientId }) =>
  fetch(`${rootUrl}/recipient/${companyCustomerId}/${recipientId}`).then(res =>
    res.json()
  );

export const deleteRecipent = async () =>
  fetch(`${rootUrl}/recipient`, { method: 'delete' }).then(res => res.json());

//INVOICE ENDPOINTS
export const getInvoices = async companyCustomerId =>
  fetch(`${rootUrl}/invoice/${companyCustomerId}`).then(res => res.json());

export const createInvoice = async invoice =>
  fetch(`${rootUrl}/invoice`, {
    method: 'post',
    body: JSON.stringify(invoice),
  }).then(res => res.json());

export const removeInvoice = async () =>
  fetch(`${rootUrl}/recipient`, { method: 'delete' }).then(res => res.json());

export const sendInvoice = async payload =>
  fetch(`${rootUrl}/invoice/mail`, {
    method: 'post',
    body: JSON.stringify(payload),
  });

//COMPANYCUSTOMER ENDPOINT
export const createCompanyCustomer = async payload =>
  fetch(`${rootUrl}/companycustomer`, {
    method: 'post',
    body: JSON.stringify({ companyCustomer: payload }),
  }).then(res => res.json());

export const getCompanyCustomer = async id =>
  fetch(`${rootUrl}/companycustomer/${id}`).then(res => res.json());
