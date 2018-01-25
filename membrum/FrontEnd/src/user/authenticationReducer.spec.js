import { reducer, initialState } from './authenticationReducer';
import {
  loginUserSuccess,
  loginUserFailure,
  loginUserRequest,
  LOGOUT_USER,
} from './authenticationActions';

describe('authenticationReduer', () => {
  it('defaults to inital state', () => {
    expect(reducer(undefined, {})).toEqual(createState());
  });

  it('should handle loginUserRequest', () => {
    expect(reducer(createState(), loginUserRequest())).toEqual(
      createState({ isAuthenticating: true, statusText: undefined })
    );
  });

  it('should handle loginUserFailure', () => {
    expect(
      reducer(
        createState(),
        loginUserFailure({
          response: {
            status: '500',
            statusText: 'User not found',
          },
        })
      )
    ).toEqual(
      createState({
        statusText: 'Authentication Error: 500 User not found',
        isAuthenticating: false,
        isAuthenticated: false,
        token: undefined,
      })
    );
  });

  it('should handle loginUserSuccess', () => {
    let token = 'q1238+jasj34ng98u';
    expect(reducer(createState(), loginUserSuccess(token, 'admin'))).toEqual(
      createState({
        statusText: 'You have been successfully logged in.',
        group: 'admin',
        shouldRedirect: true,
        isAuthenticating: false,
        isAuthenticated: true,
        token,
      })
    );
  });
});

const createState = state => ({
  ...initialState,
  ...state,
});
