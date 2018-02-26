import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import ReportForm from './Form/ReportForm';

import { fetchAllInvoiceRows } from './ReportActions';
import { getAllReports, getWorkerName, getWorkplaceById } from '../reducers';

import ReportCard from '../Components/ReportCard/ReportCard';

class Report extends Component {
  async componentDidMount() {
    await fetchAllInvoiceRows()(this.props.dispatch);
  }
  callback = () => {
    this.props.history.push('/report');
  };

  newReport = () => {
    this.props.history.push('/report/0');
  };

  renderList = props =>
    props.reports.map(report => (
      <ReportCard
        key={report.id}
        hours={report.interval}
        date={new Date(report.createdAt).toISOString().split('T')[0]}
        onClick={() => this.props.history.push(`/report/${report.id}`)}
      />
    ));

  render() {
    const { id } = this.props.match.params;
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
    );
  }
}

const mapStateToProps = (state, props) => ({
  reports: getAllReports(state),
  getWorkerName: getWorkerName(state),
  getWorkplace: id => getWorkplaceById(state, id),
});

export default withRouter(connect(mapStateToProps)(Report));
