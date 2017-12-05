import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { loadState, saveState } from './localStorage'
import rootReducer from './reducers'

const configureStore = () => {
  let store

  if (process.env.NODE_ENV === 'production') {
    const persistedState = loadState()
    store = createStore(rootReducer, persistedState)
  } else {
    store = createStore(rootReducer, composeWithDevTools())
  }

  //TODO throttle this function
  store.subscribe(() => {
    saveState(store.getState())
  })

  return store
}

export default configureStore
