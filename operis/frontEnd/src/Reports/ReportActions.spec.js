import * as types from './ActionTypes'
import * as actions from './ReportActions'

describe('Report actions', () => {
  it('should create an action to add an report', () => {
    const report = {}
    const expectedAction = {
      type: types.ADD_REPORT,
      report
    }
    expect(actions.addReport(report)).toHaveProperty('type', 'id', 'report')
  })
})
