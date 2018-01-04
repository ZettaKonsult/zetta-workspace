import {authentication} from './authenticationReducer'
import {
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER
} from './authenticationActions'

describe('authenticationReduer', () => {
  it('defaults to inital state', () => {
    expect(authentication(undefined, {})).toEqual(createState())
  })

  it('should handle LOGIN_USER_REQUEST', () => {
    expect(authentication(createState(), {type: LOGIN_USER_REQUEST})).toEqual(
      createState({isAuthenticating: true, statusText: undefined})
    )
  })

  it('should handle LOGIN_USER_FAILURE', () => {
    expect(
      authentication(createState(), {
        type: LOGIN_USER_FAILURE,
        payload: {
          status: '500',
          statusText: 'User not found'
        }
      })
    ).toEqual(
      createState({
        statusText: 'Authentication Error: 500 User not found',
        isAuthenticating: false,
        isAuthenticated: false,
        token: undefined
      })
    )
  })
})

const createState = state => ({
  token: undefined,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: undefined,
  ...state
})
