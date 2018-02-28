import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { Menu, Divider } from 'semantic-ui-react';

import { fetchAllRecipients } from './Places/RecipientActions';
import { fetchAllInvoiceRows, combineRows } from './Reports/ReportActions';

import Routes from './Routes';

class App extends Component {
  async componentDidMount() {
    const companyCustomerId = 'cjdvmtzgd000104wgiubpx9ru';
    await Promise.all([
      fetchAllRecipients(companyCustomerId)(this.props.dispatch),
      fetchAllInvoiceRows(companyCustomerId)(this.props.dispatch),
      // combineRows(companyCustomerId, [
      //   'cje6v3wej000201pffq7ju8xg',
      //   'cje72lq10000101pcast4e84e',
      // ])(this.props.dispatch),
    ]);
  }
  async signOut() {
    await Auth.signOut();
  }

  render() {
    return (
      <div>
        <Menu widths="5" inverted fluid size="large">
          <NavLink to="/report" activeOnlyWhenExact>
            Report
          </NavLink>
          <NavLink to="/place" activeOnlyWhenExact>
            Recipient
          </NavLink>
          <NavLink to="/Invoice" activeOnlyWhenExact>
            Invoice
          </NavLink>
          <NavLink to="/admin" activeOnlyWhenExact>
            Admin
          </NavLink>
          <Menu.Item as="button" onClick={this.signOut}>
            Logout
          </Menu.Item>
        </Menu>
        <Divider />
        <div style={{ margin: '0 1em' }}>
          <Routes />
        </div>
      </div>
    );
  }
}

const NavLink = ({ to, activeOnlyWhenExact, children }) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <Menu.Item as={Link} to={to} active={!!match}>
        {children}
      </Menu.Item>
    )}
  />
);

export default withRouter(connect(undefined)(App));
