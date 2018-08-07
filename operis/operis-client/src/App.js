import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchRecipients } from './Recipients/recipientReducer';
import { fetchInvoices } from './Invoice/invoiceReducer';

import { Divider } from 'semantic-ui-react';

import Routes from './Routes';
import PageNav from './Components/Nav/PageNav';

const companyCustomerId = '123123';

class App extends Component {
  componentDidMount() {
    this.props.fetchRecipients();
    this.props.fetchInvoices();
  }

  signOut = () => {};

  render() {
    return (
      <div>
        <PageNav onSignOut={this.signOut} />
        <Divider />
        <div style={{ margin: '0 1em' }}>
          <Routes companyCustomerId={companyCustomerId} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({ state, props });

const mapDispatchToProps = (dispatch, props) => ({
  fetchRecipients: () =>
    dispatch(
      fetchRecipients({
        companyCustomerId: companyCustomerId,
      })
    ),
  fetchInvoices: () => dispatch(fetchInvoices(companyCustomerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
