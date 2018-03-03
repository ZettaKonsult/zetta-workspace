import React, { Component } from 'react';
import { API } from 'aws-amplify';
import { Route } from 'react-router-dom';

import ReportForm from './Form/ReportForm';
import ReportList from './ReportList';
import { updateInvoiceState } from './invoice';

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
    const invoices = await API.get('invoice', `/invoice/${companyCustomerId}`, {
      headers: {},
    });
    this.setState({ invoices });
  }
  async postInvoice(invoice) {
    try {
      const result = await API.post('invoice', '/invoice', {
        headers: {},
        body: {
          invoice: {
            ...invoice,
            createdAt: new Date(invoice.createdAt).getTime(),
          },
          companyCustomerId,
        },
      });
      this.setState(updateInvoiceState(result));
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { match } = this.props;
    if (this.state.isFetching) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <Route
          path={`${match.path}/:id`}
          render={props => (
            <ReportForm
              recipients={this.props.recipients}
              id={props.match.params.id}
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
