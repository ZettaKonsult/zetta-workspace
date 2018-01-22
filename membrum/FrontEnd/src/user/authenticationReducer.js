import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER
} from './authenticationActions'

export const initialState = {
  token: undefined,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: undefined
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        isAuthenticating: true,
        statusText: undefined
      }

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
        token: action.payload.token,
        statusText: 'You have been successfully logged in.'
      }

    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: false,
        token: undefined,
        statusText: `Authentication Error: ${action.payload.status} ${
          action.payload.statusText
        }`
      }

    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        token: undefined,
        statusText: 'You have been successfully logged out.'
      }

    default:
      return state
  }
}

export const isUserAuthenticated = state => state.isAuthenticated

export const getUserData = state => state.token
