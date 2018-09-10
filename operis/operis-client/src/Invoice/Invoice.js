import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import InvoiceForm from './Form/InvoiceForm';
import InvoiceList from './InvoiceList';

import { getRecipients } from '../Recipients/recipientReducer';
import { createInvoice, sendInvoice, lockInvoice } from './invoiceActions';
import { getInvoices } from './invoiceReducer';

class Invoice extends Component {
  postInvoice(invoice) {
    this.props.createInvoice(invoice);
  }

  render() {
    const props = this.props;
    const { match, invoices, recipients } = this.props;

    return (
      <div>
        <Route
          path={`${match.path}/:id`}
          render={props => (
            <InvoiceForm
              recipients={recipients}
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
            <InvoiceList
              invoices={props.invoices}
              recipients={props.recipients}
              match={route.match}
              handleSend={props.sendInvoice}
              groups={props.groups}
              lockInvoice={props.lockInvoice}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipients: getRecipients(state),
  invoices: getInvoices(state),
  groups: state.invoiceGroup.allIds.map(id => state.invoiceGroup.byIds[id]),
});

const mapDispatchToProps = (dispatch, props) => ({
  createInvoice: invoice =>
    dispatch(
      createInvoice({
        ...invoice,
      })
    ),

  sendInvoice: invoice => dispatch(sendInvoice(invoice)),
  lockInvoice: invoiceId => invoiceGroupId =>
    dispatch(lockInvoice(invoiceId, invoiceGroupId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
