import {UPDATE_WORKER, DELETE_WORKER} from './WorkerActions'
import Workers from './Workers'

describe('reducer', () => {
  describe('workers', () => {
    const initialState = {
      byId: {
        '1': {id: '1', name: 'nej'},
        '2': {id: '2', name: 'Fredrik'}
      },
      allIds: ['1', '2']
    }

    it('Should UPDATE_WORKER', () => {
      expect(
        Workers(initialState, {
          type: UPDATE_WORKER,
          id: '1',
          worker: {id: '1', name: 'hej'}
        })
      ).toEqual({
        byId: {
          '1': {id: '1', name: 'hej'},
          '2': {id: '2', name: 'Fredrik'}
        },
        allIds: ['1', '2']
      })
    })

    it('should handle DELETE_WORKER', () => {
      expect(Workers(initialState, {type: DELETE_WORKER, id: '1'})).toEqual({
        byId: {'2': {id: '2', name: 'Fredrik'}},
        allIds: ['2']
      })
    })
  })
})
