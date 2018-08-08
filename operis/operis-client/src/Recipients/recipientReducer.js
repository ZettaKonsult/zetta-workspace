import * as api from '../services';
import normalizeResponse from '../util/normalizeResponse';
import { combineReducers } from 'redux';

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

  const result = await api.listRecipients(obj);

  dispath({
    type: RECIPIENT_FETCH_SUCCESS,
    payload: { ...normalizeResponse(result) },
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
      ...normalizeResponse(result),
    },
  });
};

const byIds = (state = {}, action) => {
  switch (action.type) {
    case RECIPIENT_FETCH_SUCCESS:
    case RECIPIENT_CREATE_SUCCESS:
      return { ...state, ...action.payload.entities };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case RECIPIENT_FETCH_SUCCESS:
      return [...state, ...action.payload.result];
    case RECIPIENT_CREATE_SUCCESS:
      return [
        ...state,
        ...action.payload.result.filter(id => !state.includes(id)),
      ];
    default:
      return state;
  }
};

const reducer = combineReducers({
  byIds,
  allIds,
});

export default reducer;

const getState = state => state.recipient;

export const getRecipientIds = state => getState(state).allIds;

export const getIRecipient = (state, id) => getState(state).byIds[id];

export const getRecipients = (state, id) => {
  const ids = getRecipientIds(state);
  return ids.map(id => getIRecipient(state, id));
};
