// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';

import { signIn } from './state/appReducer';
import { fetchRecipients } from './Recipients/recipientReducer';
import { getCompanyCustomer } from './CompanyCustomer/companyCustomerReducer';
import { fetchInvoices } from './Invoice/invoiceActions';

class AuthHandler extends React.Component {
  async componentDidMount() {
    try {
      if (await Auth.currentSession()) {
        this.props.signIn();
        this.props.fetchRecipients();
        this.props.fetchInvoices();
      }
    } catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  render() {
    return null;
  }
}

const map = (state, props) => {
  return {};
};

const mapDispatchToProps = {
  fetchRecipients,
  getCompanyCustomer,
  fetchInvoices,
  signIn,
};

export default connect(map, mapDispatchToProps)(AuthHandler);
