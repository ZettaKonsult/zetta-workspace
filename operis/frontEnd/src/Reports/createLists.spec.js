import createLists from './createLists'

import {ADD_REPORT, UPDATE_REPORT, UPDATE_REPORT_DATE} from './ReportActions'

describe('reports', () => {
  describe('createLists', () => {
    const date = Date.UTC(2017, 1, 1)
    const id = '1'

    it('should return initialState', () => {
      expect(createLists(undefined, {})).toEqual(createInitialState())
    })

    it('should handle ADD_REPORT', () => {
      expect(
        createLists(createInitialState(), {
          type: ADD_REPORT,
          id,
          report: {date}
        })
      ).toEqual(createState([id], {[date]: [id]}))
    })

    it('should handle UPDATE_REPORT_DATE within same date range', () => {
      expect(
        createLists(createState([id], {[date]: [id]}), {
          type: UPDATE_REPORT_DATE,
          id,
          oldDate: date,
          newDate: date
        })
      ).toEqual(createState([id], {[date]: [id]}))
    })

    it('should handle UPDATE_REPORT_DATE with new date range', () => {
      const newDate = Date.UTC(2017, 2, 1)

      expect(
        createLists(createState([id], {[date]: [id]}), {
          type: UPDATE_REPORT_DATE,
          id,
          oldDate: date,
          newDate
        })
      ).toEqual(
        createState([id], {
          [date]: [],
          [newDate]: [id]
        })
      )
    })

    it('should handle UPDATE_REPORT_DATE for dates other then first every month', () => {
      const oldDateKey = Date.UTC(2017, 5, 1)
      const oldDate = Date.UTC(2017, 5, 9)
      const newDate = Date.UTC(2017, 2, 4)

      expect(
        createLists(
          createState([id], {
            [oldDateKey]: [id]
          }),
          {
            type: UPDATE_REPORT_DATE,
            id,
            oldDate,
            newDate
          }
        )
      ).toEqual(
        createState([id], {
          [oldDateKey]: [],
          [newDate]: [id]
        })
      )
    })
  })
})

const createInitialState = () => ({allIds: [], idsByYearMonthEpoch: {}})
const createState = (allIds = [], idsByYearMonthEpoch = {}) => ({
  allIds,
  idsByYearMonthEpoch
})
