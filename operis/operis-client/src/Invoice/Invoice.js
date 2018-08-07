import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import InvoiceForm from './Form/InvoiceForm';
import InvoiceList from './InvoiceList';

import { createInvoice, getInvoices } from './invoiceReducer';

class Invoice extends Component {
  postInvoice(invoice) {
    this.props.createInvoice(invoice);
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

const mapStateToProps = state => ({
  recipients: state.recipients.recipients,
  invoices: getInvoices(state),
});

const mapDispatchToProps = (dispatch, props) => ({
  createInvoice: invoice =>
    dispatch(
      createInvoice({
        ...invoice,
        recipientIds: [invoice.recipientIds],
        companyCustomerId: props.companyCustomerId,
      })
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
