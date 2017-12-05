import * as reducer from './reports'
import { ADD_REPORT, UPDATE_REPORT } from './ReportActions'

describe('reports reducer', () => {
  describe('byId reducer', () => {
    it('should return the inital state', () => {
      expect(reducer.byId(undefined, {})).toEqual({})
    })
    it('should handle ADD_REPORT', () => {
      const expected = { '1': { id: '1', test: 'test' } }
      expect(
        reducer.byId(
          {},
          { type: ADD_REPORT, id: '1', report: { test: 'test' } }
        )
      ).toEqual(expected)
    })

    it('should handle updating existing id', () => {
      const expected = {
        '1': { id: '1', test: 'hej' },
        '2': { id: '2', text: 'nej' }
      }
      expect(
        reducer.byId(
          { '1': { id: '1', test: 'test' }, '2': { id: '2', text: 'nej' } },
          {
            type: UPDATE_REPORT,
            id: '1',
            report: { test: 'hej' }
          }
        )
      ).toEqual(expected)
    })
  })

  describe('allIds reducer', () => {
    it('adds ids for new reports to the array', () => {
      expect(
        reducer.allIds([], {
          type: ADD_REPORT,
          id: '1',
          report: { test: 'test' }
        })
      ).toHaveLength(1)
    })
  })
})
