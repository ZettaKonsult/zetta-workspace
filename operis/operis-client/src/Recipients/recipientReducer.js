import { createRecipient, listRecipients } from '../services';

const initalState = {
  recipients: [],
};

const RECIPIENT_FETCH_PENDING = 'RECIPIENT_FETCH_PENDING';
const RECIPIENT_FETCH_SUCCESS = 'RECIPIENT_FETCH_SUCCESS';
const RECIPIENT_FETCH_FAILURE = 'RECIPIENT_FETCH_FAILURE';

export const fetchRecipients = () => async dispath => {
  const recipients = await listRecipients({ companyCustomerId: '123456' });
  console.log(recipients);

  dispath({
    type: RECIPIENT_FETCH_SUCCESS,
    payload: { recipients },
  });
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case RECIPIENT_FETCH_SUCCESS:
      return {
        ...state,
        recipients: [...state.recipients, ...action.payload.recipients],
      };

    default:
      return state;
  }
};

export default reducer;
