import React from 'react';
import { connect } from 'react-redux';

import { Segment, Statistic } from 'semantic-ui-react';

import * as selectors from '../../reducers';

import ReportCard from '../../Components/ReportCard/ReportCard';

const list = props => (
  <div>
    <Segment inverted>
      <Statistic.Group widths="3" inverted size="small">
        <StatisticRow label="Hours" value={props.sumReports.hours} />

        <StatisticRow label="Extra" value={props.sumReports.extrahours} />

        <StatisticRow
          label="Total"
          value={props.sumReports.hours + props.sumReports.extrahours}
        />
      </Statistic.Group>
    </Segment>
    {props.reports.map(report => (
      <ReportCard
        key={report.id}
        worker={props.getWorkerName(report.worker)}
        hours={report.hours}
        extra={report.extrahours}
        date={new Date(report.date).toISOString().split('T')[0]}
        workplace={props.getWorkplaceById(report.place).name}
      />
    ))}
  </div>
);

const StatisticRow = ({ label, value }) => (
  <Statistic>
    <Statistic.Label>{label}</Statistic.Label>
    <Statistic.Value>{value}</Statistic.Value>
  </Statistic>
);

const mapStateToProps = (state, props) => {
  const reports = selectors.getWorkersMonthlyReport(
    state,
    props.filterMonth,
    props.filterWorker
  );
  return {
    reports,
    sumReports: selectors.sumWorkedHours(reports),
    getWorkerName: selectors.getWorkerName(state),
    getWorkplaceById: id => selectors.getWorkplaceById(state, id),
  };
};

export default connect(mapStateToProps)(list);
