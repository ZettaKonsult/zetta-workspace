import * as api from '../services';
import normalizeResponse from '../util/normalizeResponse';
import { combineReducers } from 'redux';

const RECIPIENT_FETCH_PENDING = 'RECIPIENT_FETCH_PENDING';
const RECIPIENT_FETCH_SUCCESS = 'RECIPIENT_FETCH_SUCCESS';
const RECIPIENT_FETCH_FAILURE = 'RECIPIENT_FETCH_FAILURE';

const RECIPIENT_CREATE_PENDING = 'RECIPIENT_CREATE_PENDING';
const RECIPIENT_CREATE_SUCCESS = 'RECIPIENT_CREATE_SUCCESS';
const RECIPIENT_CREATE_FAILURE = 'RECIPIENT_CREATE_FAILURE';

const RECIPIENT_DELETE_PENDING = 'RECIPIENT_DELETE_PENDING';
const RECIPIENT_DELETE_SUCCESS = 'RECIPIENT_DELETE_SUCCESS';
const RECIPIENT_DELETE_FAILURE = 'RECIPIENT_DELETE_FAILURE';

export const fetchRecipients = () => async dispath => {
  dispath({
    type: RECIPIENT_FETCH_PENDING,
  });

  const result = await api.listRecipients();

  dispath({
    type: RECIPIENT_FETCH_SUCCESS,
    payload: { ...normalizeResponse(result) },
  });
};

export const createRecipient = recipient => async (dispatch, getState) => {
  const payload = { ...recipient };

  dispatch({
    type: RECIPIENT_CREATE_PENDING,
    payload,
  });
  const result = await api.createRecipient(payload);

  dispatch({
    type: RECIPIENT_CREATE_SUCCESS,
    payload: {
      ...normalizeResponse([result]),
    },
  });
};

export const deleteRecipient = id => async dispatch => {
  dispatch({ type: RECIPIENT_DELETE_PENDING });
  try {
    const result = await api.deleteRecipent(id);
    dispatch({ type: RECIPIENT_DELETE_SUCCESS, payload: { id } });
  } catch (err) {
    dispatch({ type: RECIPIENT_DELETE_FAILURE });
  }
};

const byIds = (state = {}, action) => {
  switch (action.type) {
    case RECIPIENT_FETCH_SUCCESS:
    case RECIPIENT_CREATE_SUCCESS:
      return { ...state, ...action.payload.entities };
    case RECIPIENT_DELETE_SUCCESS:
      return {
        ...Object.keys(state).reduce((acc, key) => {
          return key === action.payload.id
            ? state
            : { ...state, [key]: state[key] };
        }),
      };
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
    case RECIPIENT_DELETE_SUCCESS:
      return state.filter(id => action.payload.id !== id);
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

export const getRecipient = (state, id) => getState(state).byIds[id];

export const getRecipients = (state, id) => {
  const ids = getRecipientIds(state);
  return ids.map(id => getRecipient(state, id));
};
