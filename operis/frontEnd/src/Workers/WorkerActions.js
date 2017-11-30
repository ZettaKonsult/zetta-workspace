import { v4 } from 'uuid'

export const ADD_WORKER = 'ADD_WORKER'

export const addWorker = worker => ({
  type: ADD_WORKER,
  id: v4(),
  worker
})
