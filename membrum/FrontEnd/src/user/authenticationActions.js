import { fetchAllPlans } from '../membership/planActions';
import { loadUserProfile } from './profileActions';
import zkAwsUsers from 'zk-aws-users'
import config from '../config'

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

export const LOGOUT_USER = 'LOGOUT_USER';

export const USER_REDIRECTED = 'USER_REDIRECTED';

export const USER_PASSWORD_RESET_REQUEST = 'USER_PASSWORD_RESET_REQUEST';
export const USER_PASSWORD_RESET_SUCCESS = 'USER_PASSWORD_RESET_SUCCESS';
export const USER_PASSWORD_RESET_FAILURE = 'USER_PASSWORD_RESET_FAILURE';

const { Account } = zkAwsUsers({config: {
  AWS_ACCESS_KEY_ID:        process.env.AWS_ACCESS_KEY_ID,
  AWS_ACCOUNT_ID:           process.env.ACCOUNT_ID,
  AWS_IDENTITY_ID:          config.cognito.IDENTITY_POOL_ID,
  AWS_UNAUTH_ROLE_ARN:      process.env.AWS_UNAUTH_ROLE_ARN,
  AWS_AUTH_ROLE_ARN:        process.env.AWS_AUTH_ROLE_ARN,
}})

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
    try {
      const {token, group} = await Account.loginUser({
        names: { customer: 'user-pool', project: 'membrum' },
        userName,
        password,
      });
      console.log(token)
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
