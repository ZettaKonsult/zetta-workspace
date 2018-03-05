import { v4 } from 'uuid';
import { API } from 'aws-amplify';

export const ADD_RECIPIENT = 'ADD_RECIPIENT';
export const UPDATE_RECIPIENT = 'UPDATE_RECIPIENT';

export const FETCH_RECIPIENT_PENDING = 'FETCH_RECIPIENT_PENDING';
export const FETCH_RECIPIENT_SUCCESS = 'FETCH_RECIPIENT_SUCCESS';
export const FETCH_RECIPIENT_FAILURE = 'FETCH_RECIPIENT_FAILURE';

export const POST_RECIPIENT_PENDING = 'POST_RECIPIENT_PENDING';
export const POST_RECIPIENT_SUCCESS = 'POST_RECIPIENT_SUCCESS';
export const POST_RECIPIENT_FAILURE = 'POST_RECIPIENT_FAILURE';

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

const postRecipientPending = () => ({
  type: POST_RECIPIENT_PENDING,
});
const postRecipientSuccess = recipient => ({
  type: POST_RECIPIENT_SUCCESS,
  payload: recipient,
});
const postRecipientFailure = error => ({
  type: POST_RECIPIENT_FAILURE,
  payload: error,
});

export const postRecipient = recipient => async dispatch => {
  dispatch(postRecipientPending());

  try {
    const result = await API.post('invoice', '/recipient', {
      header: {},
      body: {
        ...recipient,
        companyCustomerId: 'cjdvmtzgd000104wgiubpx9ru',
      },
    });
    dispatch(postRecipientSuccess(result));
  } catch (error) {
    dispatch(postRecipientFailure(error.message));
  }
};

const fetchRecipientsPending = () => ({
  type: FETCH_RECIPIENT_PENDING,
});
const fetchRecipientsSuccess = recipients => ({
  type: FETCH_RECIPIENT_SUCCESS,
  payload: recipients,
});
const fetchRecipientsFailure = error => ({
  type: FETCH_RECIPIENT_FAILURE,
  payload: error,
});

export const fetchAllRecipients = () => async dispatch => {
  dispatch(fetchRecipientsPending());
  try {
    const recipients = await API.get(
      'invoice',
      '/recipient/cjdvmtzgd000104wgiubpx9ru',
      {
        header: {},
      }
    );
    dispatch(fetchRecipientsSuccess(recipients));
  } catch (error) {
    dispatch(fetchRecipientsFailure(error));
  }
};
