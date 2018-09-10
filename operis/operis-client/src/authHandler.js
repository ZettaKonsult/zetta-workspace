// @flow
import * as React from 'react';
import { connect } from 'react-redux';

import { signIn } from './state/appReducer';
import { fetchRecipients } from './Recipients/recipientReducer';
import { getCompanyCustomer } from './Profile/companyCustomerReducer';
import { fetchInvoices } from './Invoice/invoiceActions';
import { fetchGroups } from './Invoice/invoiceGroupActions';

class AuthHandler extends React.Component {
  componentDidMount() {
    this.props.signIn();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.isAuthenticated &&
      this.props.isAuthenticated !== prevProps.isAuthenticated
    ) {
      this.loadUserData();
    }
  }

  loadUserData() {
    this.props.fetchRecipients();
    this.props.fetchInvoices();
    this.props.getCompanyCustomer();
    this.props.fetchGroups();
  }

  render() {
    return null;
  }
}

const map = (state, props) => {
  return { isAuthenticated: state.app.isAuthenticated };
};

const mapDispatchToProps = {
  fetchRecipients,
  getCompanyCustomer,
  fetchInvoices,
  fetchGroups,
  signIn,
};

export default connect(map, mapDispatchToProps)(AuthHandler);
