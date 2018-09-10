import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import CompanyCustomerForm from './Form/CompanyCustomerForm';
import { createCompanyCustomer } from './companyCustomerReducer';
import InvoiceGroup from './InvoiceGroup';
import ProfileMenu from './ProfileMenu';

class Place extends React.PureComponent {
  render() {
    const { match } = this.props;

    return (
      <React.Fragment>
        <Route component={ProfileMenu} />
        <Route
          path={`${match.path}/profile`}
          render={props => (
            <CompanyCustomerForm
              onSubmit={values => {
                this.props.createCompanyCustomer(values);
              }}
              id={props.match.params.id}
            />
          )}
        />
        <Route path={`${match.path}/invoicegroup`} component={InvoiceGroup} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  createCompanyCustomer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Place);
