import { combineReducers } from 'redux';

import * as authentication from './authenticationReducer';
import * as profile from './profileReducer';

export default combineReducers({
  authentication: authentication.reducer,
  profile: profile.reducer,
});

export const isUserAuthenticated = state =>
  authentication.isUserAuthenticated(state.authentication);

export const getUserGroup = state =>
  authentication.getUserGroup(state.authentication);

export const getUserData = state => profile.getUserData(state.profile);

export const getAuthorizedRoutes = state =>
  authentication.getAuthorizedRoutes(state.authentication);

export const shouldRedirectUser = state =>
  authentication.shouldRedirectUser(state.authentication);
