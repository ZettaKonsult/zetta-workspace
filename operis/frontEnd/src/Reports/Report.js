import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {Button} from 'semantic-ui-react'

import ReportForm from './Form/ReportForm'

import {getAllReports, getWorkerName, getWorkplace} from '../reducers'

import ReportCard from '../Components/ReportCard/ReportCard'

class Report extends Component {
  callback = () => {
    this.props.history.push('/report')
  }

  newReport = () => {
    this.props.history.push('/report/0')
  }

  renderList = props =>
    props.reports.map(report => (
      <ReportCard
        key={report.id}
        worker={props.getWorkerName(report.worker)}
        hours={report.hours}
        extra={report.extrahours}
        date={new Date(report.date).toISOString().split('T')[0]}
        workplace={props.getWorkplace(report.place).name}
        onClick={() => this.props.history.push(`/report/${report.id}`)}
      />
    ))

  render() {
    const {id} = this.props.match.params
    return (
      <div>
        {!!id ? (
          <div>
            <ReportForm callback={this.callback} id={id} />
            <Button onClick={this.callback} content="Cancel" />
          </div>
        ) : (
          <div>
            <Button
              fluid
              primary
              onClick={this.newReport}
              content="New Report"
            />
            {this.renderList(this.props)}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  reports: getAllReports(state),
  getWorkerName: getWorkerName(state),
  getWorkplace: id => getWorkplace(state, id)
})

export default withRouter(connect(mapStateToProps)(Report))
