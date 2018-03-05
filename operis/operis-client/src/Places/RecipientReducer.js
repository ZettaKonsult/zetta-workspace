import { combineReducers } from 'redux';

import { UPDATE_RECIPIENT, ADD_RECIPIENT } from './RecipientActions';
import {
  POST_RECIPIENT_PENDING,
  POST_RECIPIENT_SUCCESS,
  POST_RECIPIENT_FAILURE,
  FETCH_RECIPIENT_SUCCESS,
} from './RecipientActions';

const place = (state, action) => {
  switch (action.type) {
    case ADD_RECIPIENT:
    case UPDATE_RECIPIENT:
      return {
        id: action.id,
        ...action.recipient,
      };
    default:
      return state;
  }
};

export const byId = (state = {}, action) => {
  switch (action.type) {
    case ADD_RECIPIENT:
    case UPDATE_RECIPIENT:
      return {
        ...state,
        [action.id]: place(state[action.id], action),
      };
    case POST_RECIPIENT_SUCCESS:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_RECIPIENT_SUCCESS:
      return {
        ...state,
        ...action.payload.reduce(
          (total, row) => ({ ...total, [row.id]: row }),
          {}
        ),
      };
    default:
      return state;
  }
};

export const allIds = (state = [], action) => {
  switch (action.type) {
    case ADD_RECIPIENT:
      return [...state, action.id];
    case POST_RECIPIENT_SUCCESS:
      return [...state, action.payload.id];
    case FETCH_RECIPIENT_SUCCESS:
      return action.payload.map(row => row.id);
    default:
      return state;
  }
};

const Places = combineReducers({ byId, allIds });
export default Places;

export const getPlaces = state => state.allIds.map(id => state.byId[id]);

export const getWorkplaceById = (state, id) => state.byId[id];

export const isWorkplaceId = (state, id) =>
  state.allIds.find(compareId => compareId === id);
