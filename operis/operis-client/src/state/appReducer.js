import { Auth } from 'aws-amplify';

const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
const SIGNIN_FAILURE = 'SIGNIN_FAILURE';

const SIGNOUT_PENDING = 'SIGNOUT_PENDING';
const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS';
const SIGNOUT_FAILURE = 'SIGNOUT_FAILURE';

export const signIn = () => ({
  type: SIGNIN_SUCCESS,
});

export const signOut = () => async dispatch => {
  await Auth.signOut();

  this.userHasAuthenticated(false);
};

const initalState = {
  isAuthenticated: false,
  isAuthenticating: false,
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case SIGNIN_REQUEST:
      return { ...state, isAuthenticating: true };
    case SIGNIN_SUCCESS:
      return { ...state, isAuthenticated: true, isAuthenticating: false };
    case SIGNIN_FAILURE:
      return { ...state, isAuthenticating: false };

    case SIGNOUT_SUCCESS:
      return { ...state, isAuthenticated: false };

    default:
      return state;
  }
};

export default reducer;
