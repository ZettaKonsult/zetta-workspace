import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import CompanyCustomerForm from './Form/CompanyCustomerForm';

import { createCompanyCustomer } from './companyCustomerReducer';

class Place extends Component {
  render() {
    const { match } = this.props;

    return (
      <div>
        <Route
          path={`${match.path}/`}
          render={props => (
            <CompanyCustomerForm
              onSubmit={values => {
                this.props.createCompanyCustomer(values);
              }}
              id={props.match.params.id}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  createCompanyCustomer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Place);
