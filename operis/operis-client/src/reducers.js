import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import workers, * as fromWorkers from './Workers/WorkersReducer';

export default combineReducers({
  workers,
  form: formReducer,
});

export const getWorkers = state => fromWorkers.getWorkers(state.workers);

export const getWorkerName = state => id =>
  fromWorkers.getWorkerName(state.workers, id);

export const getVisibleWorkers = state =>
  fromWorkers.getVisibleWorkers(state.workers);

export const getWorkerById = (state, id) =>
  fromWorkers.getWorkerById(state.workers, id);

export const isWorkerId = (state, id) =>
  fromWorkers.isWorkerId(state.workers, id);
