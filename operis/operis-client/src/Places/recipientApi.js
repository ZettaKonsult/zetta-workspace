import { API } from 'aws-amplify';

export const fetchRecipientAPI = async companyCustomerId =>
  await API.get('invoice', `/recipient/${companyCustomerId}`, {
    headers: {},
  });

export const saveRecipientAPI = async (recipient, companyCustomerId) =>
  await API.post('invoice', '/recipient', {
    header: {},
    body: {
      recipient,
      companyCustomerId,
    },
  });
