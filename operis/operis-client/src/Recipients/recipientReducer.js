import * as api from '../services';

const initalState = {
  recipients: [],
};

const RECIPIENT_FETCH_PENDING = 'RECIPIENT_FETCH_PENDING';
const RECIPIENT_FETCH_SUCCESS = 'RECIPIENT_FETCH_SUCCESS';
const RECIPIENT_FETCH_FAILURE = 'RECIPIENT_FETCH_FAILURE';

const RECIPIENT_CREATE_PENDING = 'RECIPIENT_CREATE_PENDING';
const RECIPIENT_CREATE_SUCCESS = 'RECIPIENT_CREATE_SUCCESS';
const RECIPIENT_CREATE_FAILURE = 'RECIPIENT_CREATE_FAILURE';

export const fetchRecipients = obj => async dispath => {
  dispath({
    type: RECIPIENT_FETCH_PENDING,
  });

  console.log('hej');
  const recipients = await api.listRecipients(obj);

  dispath({
    type: RECIPIENT_FETCH_SUCCESS,
    payload: { recipients },
  });
};

export const createRecipient = recipient => async dispatch => {
  dispatch({
    type: RECIPIENT_CREATE_PENDING,
  });
  const result = await api.createRecipient(recipient);

  dispatch({
    type: RECIPIENT_CREATE_SUCCESS,
    payload: {
      recipient: result,
    },
  });
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case RECIPIENT_FETCH_SUCCESS:
      return {
        ...state,
        recipients: [...state.recipients, ...action.payload.recipients],
      };
    case RECIPIENT_CREATE_SUCCESS:
      const recipient = action.payload.recipient;
      return {
        recipients: [
          ...state.recipients.filter(r => r.id !== recipient.id),
          recipient,
        ],
      };
    default:
      return state;
  }
};

export default reducer;
