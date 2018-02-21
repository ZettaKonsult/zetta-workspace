import { v4 } from 'uuid';

export const ADD_RECIPIENT = 'ADD_RECIPIENT';
export const UPDATE_RECIPIENT = 'UPDATE_RECIPIENT';

export const addRecipient = recipient => ({
  type: ADD_RECIPIENT,
  id: v4(),
  recipient,
});

export const updateRecipient = recipient => ({
  type: UPDATE_RECIPIENT,
  id: recipient.id,
  recipient,
});
