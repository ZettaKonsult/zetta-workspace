import createLists from './createLists'

import { ADD_REPORT, UPDATE_REPORT, UPDATE_REPORT_DATE } from './ReportActions'

describe('reports', () => {
  describe('createLists', () => {
    const initialState = { allIds: [], idsByYearMonthEpoch: {} }
    const date = Date.UTC(2017, 1, 1)

    it('should return initialState', () => {
      expect(createLists(undefined, {})).toEqual(initialState)
    })

    it('should handle ADD_REPORT', () => {
      expect(
        createLists(initialState, {
          type: ADD_REPORT,
          id: '1',
          report: { date }
        })
      ).toEqual({
        allIds: ['1'],
        idsByYearMonthEpoch: {
          [date]: ['1']
        }
      })
    })

    it('should handle UPDATE_REPORT_DATE within same date range', () => {
      expect(
        createLists(
          {
            allIds: ['1'],
            idsByYearMonthEpoch: {
              [date]: ['1']
            }
          },
          {
            type: UPDATE_REPORT_DATE,
            id: '1',
            oldDate: date,
            newDate: date
          }
        )
      ).toEqual({
        allIds: ['1'],
        idsByYearMonthEpoch: {
          [date]: ['1']
        }
      })
    })

    it('should handle UPDATE_REPORT_DATE with new date range', () => {
      const newDate = Date.UTC(2017, 2, 1)
      expect(
        createLists(
          {
            allIds: ['1'],
            idsByYearMonthEpoch: {
              [date]: ['1']
            }
          },
          {
            type: UPDATE_REPORT_DATE,
            id: '1',
            oldDate: date,
            newDate
          }
        )
      ).toEqual({
        allIds: ['1'],
        idsByYearMonthEpoch: {
          [date]: [],
          [newDate]: ['1']
        }
      })
    })

    it('should handle UPDATE_REPORT_DATE for dates other then first every month', () => {
      const oldDateKey = Date.UTC(2017, 5, 1)
      const oldDate = Date.UTC(2017, 5, 9)
      const newDate = Date.UTC(2017, 2, 4)
      expect(
        createLists(
          {
            allIds: ['1'],
            idsByYearMonthEpoch: {
              [oldDateKey]: ['1']
            }
          },
          {
            type: UPDATE_REPORT_DATE,
            id: '1',
            oldDate,
            newDate
          }
        )
      ).toEqual({
        allIds: ['1'],
        idsByYearMonthEpoch: {
          [oldDateKey]: [],
          [newDate]: ['1']
        }
      })
    })
  })
})
