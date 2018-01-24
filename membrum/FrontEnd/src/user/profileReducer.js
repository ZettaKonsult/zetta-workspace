import {
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from './profileActions';

import { UPDATE_PROFILE_DATA } from './profileActions';

export const initialState = {
  user: {},
  isFetching: false,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isFetching: false,
      };
    case LOAD_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case UPDATE_PROFILE_DATA:
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
}

export const getUserData = state => state.user;
