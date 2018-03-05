import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ReportForm from './Form/ReportForm';
import ReportList from './ReportList';
import { updateInvoiceState, fetchInvoiceAPI, saveInvoiceAPI } from './invoice';

const companyCustomerId = 'cjdvmtzgd000104wgiubpx9ru';

export default class Report extends Component {
  constructor() {
    super();
    this.state = {
      invoices: [],
      isFetching: false,
    };
  }
  async componentDidMount() {
    this.setState({ isFetching: true });
    const invoices = await fetchInvoiceAPI(companyCustomerId);
    this.setState({ invoices, isFetching: false });
  }
  async postInvoice(invoice) {
    try {
      const result = await saveInvoiceAPI(invoice, companyCustomerId);
      this.setState(updateInvoiceState(result));
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
              <ReportForm
                recipients={this.props.recipients}
                id={props.match.params.id}
                isFetching={this.state.isFetching}
                invoices={this.state.invoices}
                onSubmit={async values => {
                  await this.postInvoice(values);
                  props.history.push('/report');
                }}
              />
            )}
          />
          <Route
            exact
            path={`${match.path}`}
            render={() => <ReportList invoices={this.state.invoices} />}
          />
        </div>
      );
    }
  }
}
