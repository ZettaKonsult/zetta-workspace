import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { addPlace, updateWorkplace } from '../PlaceActions';
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
    <Field name="name" component={Input} placeholder="Name of place" />
    <Field
      name="town"
      component={Input}
      placeholder="City place is located at"
    />
    <Divider />
    <Button type="submit">Save</Button>
  </Form>
);

PlaceForm = reduxForm({ form: 'placeForm', validate })(PlaceForm);

const mapStateToProps = (state, props) => ({
  idExists: isWorkplaceId(state, props.id),
  initialValues: getWorkplaceById(state, props.id),
});

const mapDispatchToProps = dispatch => ({
  addNewWorkplace: values => dispatch(addPlace(values)),
  updateWorkplace: values => dispatch(updateWorkplace(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceForm);
