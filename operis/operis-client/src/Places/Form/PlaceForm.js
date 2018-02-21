import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { addRecipient, updateRecipient } from '../RecipientActions';
import { isWorkplaceId, getWorkplaceById } from '../../reducers';
import validate from './PlaceFormValidation';
import { Input } from '../../Components/Form/Input';
import { Form, Button, Divider } from 'semantic-ui-react';

let PlaceForm = props => (
  <Form
    autoComplete="off"
    onSubmit={props.handleSubmit(values => {
      if (props.idExists) {
        props.updateWorkplace(values);
      } else {
        props.addNewWorkplace(values);
      }
      if (typeof props.callback !== 'undefined') {
        props.callback();
      }
    })}
  >
    <Field name="firstName" component={Input} placeholder="First Name" />
    <Field name="lastName" component={Input} placeholder="Last Name" />
    <Field name="email" component={Input} placeholder="Email" />
    <Field name="mobile" component={Input} placeholder="mobile" />
    <Field name="address" component={Input} placeholder="Address" />
    <Field name="city" component={Input} placeholder="City" />
    <Field name="zipcode" component={Input} placeholder="Zipcode" />
    <Divider />
    <Button type="submit">Save</Button>
    <Button type="button" onClick={props.callback}>
      Cancel
    </Button>
  </Form>
);

PlaceForm = reduxForm({ form: 'placeForm', validate })(PlaceForm);

const mapStateToProps = (state, props) => ({
  idExists: isWorkplaceId(state, props.id),
  initialValues: getWorkplaceById(state, props.id),
});

const mapDispatchToProps = dispatch => ({
  addNewWorkplace: values => dispatch(addRecipient(values)),
  updateWorkplace: values => dispatch(updateRecipient(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceForm);
