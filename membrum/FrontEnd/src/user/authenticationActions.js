import db from '../mocks/db'

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'

export const LOGOUT_USER = 'LOGOUT_USER'

export const USER_PASSWORD_RESET_REQUEST = 'USER_PASSWORD_RESET_REQUEST'
export const USER_PASSWORD_RESET_SUCCESS = 'USER_PASSWORD_RESET_SUCCESS'
export const USER_PASSWORD_RESET_FAILURE = 'USER_PASSWORD_RESET_FAILURE'

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE'

export function loginUserSuccess(token) {
  localStorage.setItem('token', token)
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token
    }
  }
}

export function loginUserFailure(error) {
  localStorage.removeItem('token')
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function logout() {
  localStorage.removeItem('token')
  return {
    type: LOGOUT_USER
  }
}

export function logoutAndRedirect() {
  return (dispatch, state) => {
    dispatch(logout())
    // dispatch(pushState(null, '/login'))
  }
}

export function loginUser(email, password, redirect = '/') {
  return async function(dispatch) {
    dispatch(loginUserRequest())
    console.log(email, password)
    try {
      console.warn('No login provider')
      const token = {}
      dispatch(loginUserSuccess(token))
    } catch (error) {
      dispatch(
        loginUserFailure({
          response: { status: 'fail', statusText: 'No login provider' }
        })
      )
    }
  }
}

export function loadUserRequest() {
  return {
    type: LOAD_USER_REQUEST
  }
}
export function loadUserSuccess(user) {
  return {
    type: LOAD_USER_SUCCESS,
    payload: { user }
  }
}
export function loadUserFailure() {
  return {
    type: LOAD_USER_FAILURE
  }
}

export const loadUserProfile = () => async dispatch => {
  dispatch(loadUserRequest())

  try {
    const user = await db.members.find(user => user.ssn === '910504-0035')
    dispatch(loadUserSuccess(user))
  } catch (error) {
    dispatch(loadUserFailure(error))
  }
}
