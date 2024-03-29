import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import { Input } from '../../Components/Form/Input';
import { getProfile } from '../companyCustomerReducer';
import { Form, Button, Divider } from 'semantic-ui-react';

let CompanyCustomerForm = ({ isLoading, error, ...props }) => (
  <Form autoComplete="off" onSubmit={props.handleSubmit}>
    <Field name="firstName" component={Input} placeholder="First Name" />
    <Field name="lastName" component={Input} placeholder="Last Name" />
    <Field name="email" component={Input} placeholder="Email" />
    <Field name="mobile" component={Input} placeholder="mobile" />
    <Field name="address" component={Input} placeholder="Address" />
    <Field name="city" component={Input} placeholder="City" />
    <Field name="zipcode" component={Input} placeholder="Zipcode" />
    <Field name="company" component={Input} placeholder="Company" />
    <Field name="vat" component={Input} placeholder="VAT" />
    <Field name="giro" component={Input} placeholder="Bankgiro" />
    <Divider />
    {error && <strong>{error}</strong>}
    <div>
      <Button loading={isLoading} disabled={isLoading} type="submit">
        Save
      </Button>
      <Button
        loading={isLoading}
        disabled={isLoading}
        as={Link}
        to={`/recipient`}
      >
        Cancel
      </Button>
    </div>
  </Form>
);

CompanyCustomerForm = reduxForm({ form: 'companyCustomerForm' })(
  CompanyCustomerForm
);
const mapStateToProps = (state, props) => {
  const profile = getProfile(state);
  if (profile) {
    return {
      initialValues: profile,
      isLoading: props.isLoading,
    };
  } else {
    return {};
  }
};

export default connect(mapStateToProps)(CompanyCustomerForm);
