export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST'
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE'
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS'

export const LOGOUT_USER = 'LOGOUT_USER'

export const USER_PASSWORD_RESET_REQUEST = 'USER_PASSWORD_RESET_REQUEST'
export const USER_PASSWORD_RESET_SUCCESS = 'USER_PASSWORD_RESET_SUCCESS'
export const USER_PASSWORD_RESET_FAILURE = 'USER_PASSWORD_RESET_FAILURE'

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
      throw new Error()
      const token = () => {}
      dispatch(loginUserSuccess(token))
    } catch (error) {
      dispatch(
        loginUserFailure({
          response: {status: 'fail', statusText: 'No login provider'}
        })
      )
    }
  }
}
