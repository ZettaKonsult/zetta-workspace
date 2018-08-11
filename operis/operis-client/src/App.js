import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRecipients } from './Recipients/recipientReducer';
import { fetchInvoices } from './Invoice/invoiceActions';
import { getCompanyCustomer } from './CompanyCustomer/companyCustomerReducer';

import { Divider } from 'semantic-ui-react';

import Routes from './Routes';
import PageNav from './Components/Nav/PageNav';

const companyCustomerId = 'cjkplk2120000lccvxv3d68fl';

class App extends Component {
  componentDidMount() {
    this.props.getCompanyCustomer(companyCustomerId);
    this.props.fetchRecipients(companyCustomerId);
    this.props.fetchInvoices(companyCustomerId);
  }

  signOut = () => {};

  render() {
    return (
      <div>
        <PageNav onSignOut={this.signOut} />
        <Divider />
        <div style={{ margin: '0 1em' }}>
          <Routes />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({ state, props });

const mapDispatchToProps = (dispatch, props) => ({
  fetchRecipients: id => dispatch(fetchRecipients(id)),
  fetchInvoices: id => dispatch(fetchInvoices(id)),
  getCompanyCustomer: id => dispatch(getCompanyCustomer(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
