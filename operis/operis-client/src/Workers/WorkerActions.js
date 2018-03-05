import { v4 } from 'uuid';

export const ADD_WORKER = 'ADD_WORKER';
export const UPDATE_WORKER = 'UPDATE_WORKER';
export const DELETE_WORKER = 'DELETE_WORKER';

export const addWorker = worker => ({
  type: ADD_WORKER,
  id: v4(),
  worker,
});

export const updateWorker = worker => ({
  type: UPDATE_WORKER,
  id: worker.id,
  worker,
});

export const deleteWorker = id => ({
  type: DELETE_WORKER,
  id,
});
