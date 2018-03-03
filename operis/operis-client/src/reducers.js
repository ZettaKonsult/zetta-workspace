import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import workers, * as fromWorkers from './Workers/WorkersReducer';
import places, * as fromPlaces from './Places/RecipientReducer';

export default combineReducers({
  workers,
  places,
  form: formReducer,
});

export const getWorkers = state => fromWorkers.getWorkers(state.workers);

export const getWorkerName = state => id =>
  fromWorkers.getWorkerName(state.workers, id);

export const getVisibleWorkers = state =>
  fromWorkers.getVisibleWorkers(state.workers);

export const getPlaces = state => fromPlaces.getPlaces(state.places);

export const getWorkplaceById = (state, id) =>
  fromPlaces.getWorkplaceById(state.places, id);

export const isWorkplaceId = (state, id) =>
  fromPlaces.isWorkplaceId(state.places, id);

export const getWorkerById = (state, id) =>
  fromWorkers.getWorkerById(state.workers, id);

export const isWorkerId = (state, id) =>
  fromWorkers.isWorkerId(state.workers, id);
