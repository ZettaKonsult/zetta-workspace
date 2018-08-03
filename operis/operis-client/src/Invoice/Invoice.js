import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import InvoiceForm from './Form/InvoiceForm';
import InvoiceList from './InvoiceList';

import { getInvoices, createInvoice, removeInvoice } from '../services';

class Invoice extends Component {
  constructor() {
    super();
    this.state = {
      invoices: [],
      isFetching: false,
    };
  }

  async componentDidMount() {
    this.setState({ isFetching: true });

    const invoices = await getInvoices(this.props.companyCustomerId);

    this.setState({ invoices, isFetching: false });
  }

  async postInvoice(invoice) {
    try {
      const result = await createInvoice(invoice, this.props.companyCustomerId);
      console.log(result);
      this.setState(state => ({
        invoices: [...state.invoices.filter(r => r.id !== result.id), result],
      }));
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { match } = this.props;

    if (this.state.isFetching) {
      return <p>Loading...</p>;
    } else {
      return (
        <div>
          <Route
            path={`${match.path}/:id`}
            render={props => (
              <InvoiceForm
                recipients={this.props.recipients}
                id={props.match.params.id}
                isFetching={this.state.isFetching}
                invoices={this.state.invoices}
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
              <InvoiceList invoices={this.state.invoices} match={route.match} />
            )}
          />
        </div>
      );
    }
  }
}

export default connect(state => ({ recipients: state.recipients.recipients }))(
  Invoice
);
