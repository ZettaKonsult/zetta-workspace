import {combineReducers} from 'redux'

import {authentication} from './authenticationReducer'
import {registration} from './registrationReducer'

export default combineReducers({authentication, registration})
