import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import ReportCard from '../Components/ReportCard/ReportCard';

const ReportList = ({ invoices }) => (
  <div>
    <Button as={Link} to={`/report/0`} fluid primary content="New Report" />
    {invoices.map(report => (
      <div key={report.id}>
        <Link to={`/report/${report.id}`}>
          <ReportCard
            hours={report.interval}
            date={new Date(report.createdAt).toISOString().split('T')[0]}
            worker={report.recipientId}
          />
        </Link>
      </div>
    ))}
  </div>
);

export default ReportList;
