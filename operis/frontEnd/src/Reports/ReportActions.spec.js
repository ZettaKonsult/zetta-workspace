import * as actions from './ReportActions'

describe('Report actions', () => {
  it('should create an action to add an report', () => {
    const report = {}
    const expectedAction = {
      type: actions.ADD_REPORT,
      report
    }
    expect(actions.addReport(report)).toHaveProperty('type', 'id', 'report')
  })
})
