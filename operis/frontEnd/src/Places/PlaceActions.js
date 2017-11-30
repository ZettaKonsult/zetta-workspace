import { v4 } from 'uuid'

export const ADD_PLACE = 'ADD_PLACE'

export const addPlace = place => ({
  type: ADD_PLACE,
  id: v4(),
  place
})
