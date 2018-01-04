import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension/logOnlyInProduction'
import thunk from 'redux-thunk'

import {loadState, saveState} from './localStorage'
import rootReducer from './reducers'

const configureStore = () => {
  const persistedState =
    process.env.NODE_ENV === 'production' ? loadState() : {}
  const middleware = [thunk]

  const store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(applyMiddleware(...middleware))
  )

  //TODO throttle this function
  store.subscribe(() => {
    saveState(store.getState())
  })

  return store
}

export default configureStore
