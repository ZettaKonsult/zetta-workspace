import reducer from './reports'
import * as types from './ActionTypes'

describe('reports reducer', () => {
  it('should return the inital state', () => {
    expect(reducer(undefined, {})).toEqual({})
  })
  it('should handle ADD_REPORT', () => {
    const expected = { '1': { id: '1', test: 'test' } }
    expect(
      reducer({}, { type: types.ADD_REPORT, id: '1', report: { test: 'test' } })
    ).toEqual(expected)
  })
})
