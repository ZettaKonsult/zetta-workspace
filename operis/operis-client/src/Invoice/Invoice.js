import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import InvoiceForm from './Form/InvoiceForm';
import InvoiceList from './InvoiceList';

import { createInvoice, removeInvoice } from '../services';

class Invoice extends Component {
  async postInvoice(invoice) {
    try {
      await createInvoice({
        ...invoice,
        recipientIds: [invoice.recipientIds],
        companyCustomerId: this.props.companyCustomerId,
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { match, invoices } = this.props;

    return (
      <div>
        <Route
          path={`${match.path}/:id`}
          render={props => (
            <InvoiceForm
              recipients={this.props.recipients}
              id={props.match.params.id}
              isFetching={false}
              invoices={invoices}
              onSubmit={async values => {
                await this.postInvoice(values);
                props.history.push('/invoice');
              }}
            />
          )}
        />
        <Route
          exact
          path={`${match.path}`}
          render={route => (
            <InvoiceList invoices={invoices} match={route.match} />
          )}
        />
      </div>
    );
  }
}

export default connect(state => ({
  recipients: state.recipients.recipients,
  invoices: state.invoice.invoices,
}))(Invoice);
