import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  USER_REDIRECTED,
} from './authenticationActions';

export const initialState = {
  token: undefined,
  group: 'guest',
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: undefined,
  shouldRedirect: false,
  authorizedRoutes: {
    guest: [{ to: '/login', label: 'Login', key: 'login' }],
    user: [{ to: '/user', label: 'Profile' }],
    admin: [
      { to: '/', label: 'Dashboard', key: 'admin' },
      { to: '/plans', label: 'Plans', key: 'plans' },
      { to: '/find', label: 'Find Member', key: 'find' },
    ],
  },
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        isAuthenticating: true,
        statusText: undefined,
      };
    //TODO GROUP MUST BE SET MORE DYNAMIC
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
        token: action.payload.token,
        shouldRedirect: true,
        group: 'admin',
        statusText: 'You have been successfully logged in.',
      };

    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: false,
        token: undefined,
        statusText: `Authentication Error: ${action.payload.status} ${
          action.payload.statusText
        }`,
      };

    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        token: undefined,
        shouldRedirect: true,
        statusText: 'You have been successfully logged out.',
      };
    case USER_REDIRECTED:
      return {
        ...state,
        shouldRedirect: false,
      };
    default:
      return state;
  }
}

export const isUserAuthenticated = state => state.isAuthenticated;

export const shouldRedirectUser = state => state.shouldRedirect;

export const getUserGroup = state => state.group;

export const getUserData = state => state.token;

export const getAuthorizedRoutes = state => state.authorizedRoutes[state.group];
