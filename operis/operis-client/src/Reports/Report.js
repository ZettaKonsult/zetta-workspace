import React from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import ReportForm from './Form/ReportForm';

import { getAllReports } from '../reducers';

import ReportCard from '../Components/ReportCard/ReportCard';

let ReportList = ({ reports }) => (
  <div>
    <Button as={Link} to={`/report/0`} fluid primary content="New Report" />
    {reports.map(report => (
      <Link key={report.id} to={`/report/${report.id}`}>
        <ReportCard
          hours={report.interval}
          date={new Date(report.createdAt).toISOString().split('T')[0]}
          worker={report.recipientId}
        />
      </Link>
    ))}
  </div>
);
const mapStateToProps = (state, props) => ({
  reports: getAllReports(state),
});
ReportList = connect(mapStateToProps)(ReportList);

export default ({ match }) => (
  <div>
    <Route
      path={`${match.path}/:id`}
      render={props => (
        <ReportForm
          callback={() => props.history.push('/')}
          id={props.match.params.id}
        />
      )}
    />
    <Route exact path={`${match.path}`} render={() => <ReportList />} />
  </div>
);
