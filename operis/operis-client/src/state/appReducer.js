import { Auth } from 'aws-amplify';

const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
const SIGNIN_FAILURE = 'SIGNIN_FAILURE';

// const SIGNOUT_PENDING = 'SIGNOUT_PENDING';
const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS';
// const SIGNOUT_FAILURE = 'SIGNOUT_FAILURE';

const unsafe_signIn = () => ({
  type: SIGNIN_SUCCESS,
});

export const signIn = (email = '', password = '') => async dispatch => {
  dispatch({ type: SIGNIN_REQUEST, payload: { email, password } });
  try {
    if (email.length > 1 && password.length > 1) {
      await Auth.signIn(email, password);
      dispatch(unsafe_signIn());
    } else if (await Auth.currentSession()) {
      dispatch(unsafe_signIn());
    } else {
      return false;
    }
    return true;
  } catch (err) {
    console.log(err);
    dispatch({ type: SIGNIN_FAILURE });
  }
};

export const signOut = () => async dispatch => {
  await Auth.signOut();

  dispatch({
    type: SIGNOUT_SUCCESS,
  });
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
