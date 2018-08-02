import { API } from 'aws-amplify';

export const fetchRecipientAPI = async companyCustomerId => {
  try {
    return await API.get('invoice', `/recipient/${companyCustomerId}`, {
      headers: {},
    });
  } catch (error) {
    throw error;
  }
};
export const saveRecipientAPI = async (recipient, companyCustomerId) => {
  try {
    return await API.post('invoice', '/recipient', {
      header: {},
      body: {
        recipient,
        companyCustomerId,
      },
    });
  } catch (error) {
    throw error;
  }
};
