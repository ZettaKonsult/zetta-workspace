import { createStore } from 'redux'
import { loadState, saveState } from './localStorage'

const configureStore = () => {
  const persistedState = loadState()
  const store = createStore(() => {}, persistedState)

  //TODO throttle this function
  store.subscribe(() => {
    saveState(store.getState())
  })

  return store
}

export default configureStore
