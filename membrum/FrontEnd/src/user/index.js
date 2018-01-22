import { combineReducers } from 'redux'

import * as authentication from './authenticationReducer'
import * as profile from './profileReducer'

export default combineReducers({
  authentication: authentication.reducer,
  profile: profile.reducer
})

export const isUserAuthenticated = state =>
  authentication.isUserAuthenticated(state.authentication)

export const getUserData = state => profile.getUserData(state.profile)
