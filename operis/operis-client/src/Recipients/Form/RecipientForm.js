import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import validate from './RecipientFormValidation';
import { Input } from '../../Components/Form/Input';
import { Form, Button, Divider } from 'semantic-ui-react';

let PlaceForm = ({ isLoading, error, ...props }) => (
  <Form autoComplete="off" onSubmit={props.handleSubmit}>
    <Field name="firstName" component={Input} placeholder="First Name" />
    <Field name="lastName" component={Input} placeholder="Last Name" />
    <Field name="email" component={Input} placeholder="Email" />
    <Field name="mobile" component={Input} placeholder="mobile" />
    <Field name="address" component={Input} placeholder="Address" />
    <Field name="city" component={Input} placeholder="City" />
    <Field name="zipcode" component={Input} placeholder="Zipcode" />
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

PlaceForm = reduxForm({ form: 'placeForm', validate })(PlaceForm);

const mapStateToProps = (state, props) => {
  const recipient = props.recipients.find(
    recipient => recipient.id === props.id
  );
  if (recipient) {
    return {
      initialValues: recipient,
      isLoading: props.isLoading,
    };
  } else {
    return {};
  }
};

export default connect(mapStateToProps)(PlaceForm);
