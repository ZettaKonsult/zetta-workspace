import { createStore } from 'redux'

import { loadState, saveState } from './localStorage'
import rootReducer from './reducers'

const addLoggingToDispatch = store => {
  const rawDispatch = store.dispatch
  if (!console.group) {
    return rawDispatch
  }
  return action => {
    console.group(action.type)
    console.log('%c prev state', 'color: gray', store.getState())
    console.log('%c action', 'color: blue', action)
    const returnValue = rawDispatch(action)
    console.log('%c next state', 'color: green', store.getState())
    console.groupEnd(action.type)
    return returnValue
  }
}

const configureStore = () => {
  //TODO uncomment when ready
  /*const persistedState = loadState()
  const store = createStore(rootReducer, persistedState)*/

  const store = createStore(rootReducer)

  if (process.env.NODE_ENV !== 'production') {
    store.dispatch = addLoggingToDispatch(store)
  }

  //TODO throttle this function
  store.subscribe(() => {
    saveState(store.getState())
  })

  return store
}

export default configureStore
