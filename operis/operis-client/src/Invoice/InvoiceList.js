import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import InvoiceCard from './InvoiceCard';

const ReportList = ({ invoices, match, handleSend }) => (
  <div>
    <Button
      as={Link}
      to={`${match.path}/0`}
      fluid
      primary
      content="New Report"
    />
    {invoices.map(invoice => (
      <div key={invoice.id}>
        <button onClick={() => handleSend(invoice)}>Send</button>
        <Link to={`${match.path}/${invoice.id}`}>
          <InvoiceCard
            hours={calcHours(invoice.invoiceRows)}
            date={new Date(invoice.createdAt).toISOString().split('T')[0]}
            worker={invoice.recipientIds[0]}
          />
        </Link>
      </div>
    ))}
  </div>
);

const calcHours = rows => rows.reduce((tot, row) => Number(row.unit) + tot, 0);

export default ReportList;
