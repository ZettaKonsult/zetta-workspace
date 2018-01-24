import db from '../mocks/db';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const UPDATE_PROFILE_DATA = 'UPDATE_PROFILE_DATA';

export const updateProfileData = user => ({
  type: UPDATE_PROFILE_DATA,
  payload: { user },
});

export const saveProfile = values => dispatch => {
  dispatch(updateProfileData(values));
};

export function loadUserRequest() {
  return {
    type: LOAD_USER_REQUEST,
  };
}
export function loadUserSuccess(user) {
  return {
    type: LOAD_USER_SUCCESS,
    payload: { user },
  };
}

export function loadUserFailure() {
  return {
    type: LOAD_USER_FAILURE,
  };
}

export const loadUserProfile = () => async dispatch => {
  dispatch(loadUserRequest());

  try {
    const user = await db.members.find(user => user.ssn === '910504-0035');
    dispatch(loadUserSuccess(user));
  } catch (error) {
    dispatch(loadUserFailure(error));
  }
};
