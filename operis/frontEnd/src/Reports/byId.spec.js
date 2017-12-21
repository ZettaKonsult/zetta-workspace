import byId, * as selectors from './byId'
import {ADD_REPORT, UPDATE_REPORT} from './ReportActions'

describe('byId', () => {
  const date = Date.UTC(2017, 1, 2)
  const dateKey = Date.UTC(2017, 1, 1)
  const initialState = {}

  it('should return the inital state', () => {
    expect(byId(undefined, {})).toEqual(initialState)
  })

  it('should handle ADD_REPORT', () => {
    expect(
      byId(undefined, {
        type: ADD_REPORT,
        id: '1',
        report: {date}
      })
    ).toEqual({'1': {id: '1', date}})
  })

  it('should handle UPDATE_REPORT', () => {
    expect(
      byId(
        {'1': {id: '1', test: 'test'}},
        {type: UPDATE_REPORT, id: '1', report: {test: 'hej'}}
      )
    ).toEqual({'1': {id: '1', test: 'hej'}})
  })
})
