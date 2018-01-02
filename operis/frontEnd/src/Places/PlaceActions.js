import {v4} from 'uuid'

export const ADD_PLACE = 'ADD_PLACE'
export const UPDATE_WORKPLACE = 'UPDATE_WORKPLACE'

export const addPlace = place => ({
  type: ADD_PLACE,
  id: v4(),
  place
})

export const updateWorkplace = workplace => ({
  type: UPDATE_WORKPLACE,
  id: workplace.id,
  place: workplace
})
