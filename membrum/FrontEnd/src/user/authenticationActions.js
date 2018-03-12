import { fetchAllPlans } from '../membership/planActions';
import { loadUserProfile } from './profileActions';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

export const LOGOUT_USER = 'LOGOUT_USER';

export const USER_REDIRECTED = 'USER_REDIRECTED';

export const USER_PASSWORD_RESET_REQUEST = 'USER_PASSWORD_RESET_REQUEST';
export const USER_PASSWORD_RESET_SUCCESS = 'USER_PASSWORD_RESET_SUCCESS';
export const USER_PASSWORD_RESET_FAILURE = 'USER_PASSWORD_RESET_FAILURE';

export function loginUserSuccess(token, group) {
  localStorage.setItem('token', token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token,
      group: group,
    },
  };
}

export function loginUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText,
    },
  };
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST,
  };
}

export function logout() {
  localStorage.removeItem('token');
  return {
    type: LOGOUT_USER,
  };
}

export function userRedirected() {
  return {
    type: USER_REDIRECTED,
  };
}

export function logoutAndRedirect() {
  return (dispatch, state) => {
    dispatch(logout());
    // dispatch(pushState(null, '/login'))
  };
}

export function loginUser(userName, password, redirect = '/') {
  return async function(dispatch) {
    dispatch(loginUserRequest());
    const { group, token } = getTokenGroup(userName);
    try {
      dispatch(loginUserSuccess(token, group));
      await dispatch(fetchAllPlans(dispatch));
      await loadUserProfile(token)(dispatch);
    } catch (error) {
      dispatch(
        loginUserFailure({
          response: { status: 'fail', statusText: 'No login provider' },
        })
      );
    }
  };
}

const getTokenGroup = userName => {
  let group, token;
  if (userName === 'Fredrik') {
    group = 'user';
    token = '910504-0035';
  } else if (userName === 'Sture') {
    group = 'user';
    token = '901020-1234';
  } else {
    group = 'admin';
    token = '123123';
  }
  return { group, token };
};
