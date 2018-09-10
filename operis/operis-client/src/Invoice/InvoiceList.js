import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

import InvoiceCard from './InvoiceCard';

const ReportList = ({
  invoices,
  match,
  handleSend,
  recipients,
  groups,
  lockInvoice,
}) => (
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
        <InvoiceGroup groups={groups} handleSubmit={lockInvoice(invoice.id)} />
        <Link to={`${match.path}/${invoice.id}`}>
          <InvoiceCard
            hours={calcHours(invoice.invoiceRows)}
            date={new Date(invoice.createdAt).toISOString().split('T')[0]}
            recipient={invoice.recipientIds[0]}
          />
        </Link>
      </div>
    ))}
  </div>
);

class InvoiceGroup extends React.PureComponent {
  state = {
    value: 'select',
  };

  handleSubmit = () => {
    this.props.handleSubmit(this.state.value);
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <React.Fragment>
        <button onClick={this.handleSubmit}>Lock invoice</button>
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="select">Choose a invoice group</option>
          {this.props.groups.map(group => (
            <option key={group.id} value={group.id}>
              {group.name}
            </option>
          ))}
        </select>
      </React.Fragment>
    );
  }
}

const calcHours = rows => rows.reduce((tot, row) => Number(row.unit) + tot, 0);

export default ReportList;
