export const createRecipient = async recipient =>
  fetch(`http://localhost:8080/recipient`, {
    method: 'post',
    body: JSON.stringify(recipient),
  }).then(res => res.json());

export const listRecipients = async ({ companyCustomerId }) =>
  fetch(`http://localhost:8080/recipient/${companyCustomerId}`).then(res =>
    res.json()
  );

export const updateRecipient = async () =>
  fetch(`http://localhost:8080/recipient`, { method: 'put' }).then(res =>
    res.json()
  );

export const getRecipient = async ({ companyCustomerId, recipientId }) =>
  fetch(
    `http://localhost:8080/recipient/${companyCustomerId}/${recipientId}`
  ).then(res => res.json());

export const deleteRecipent = async () =>
  fetch(`http://localhost:8080/recipient`, { method: 'delete' }).then(res =>
    res.json()
  );
