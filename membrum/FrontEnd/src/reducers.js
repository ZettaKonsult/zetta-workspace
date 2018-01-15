import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import userReducer from './user'
import { membership as membershipReducer } from './membership/membershipReducer'

export default combineReducers({
  userReducer,
  membershipReducer,
  form
})
