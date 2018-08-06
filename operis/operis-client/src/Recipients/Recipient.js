import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { SubmissionError } from 'redux-form';

import RecipientForm from './Form/RecipientForm';
import RecipientList from './RecipientList';

import { createRecipient } from './recipientReducer';

class Place extends Component {
  createRecipient = async recipient => {
    try {
      this.props.createRecipient(recipient);
      this.props.history.push('/recipient');
    } catch (error) {
      throw new SubmissionError({ _error: error.message });
    }
  };

  render() {
    const { match, history, recipients } = this.props;

    return (
      <div>
        <Route
          path={`${match.path}/:id`}
          render={props => (
            <RecipientForm
              onSubmit={values => {
                this.createRecipient(values);
              }}
              id={props.match.params.id}
              recipients={recipients}
            />
          )}
        />
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <RecipientList
              recipients={recipients}
              onClick={id => history.push(`/recipient/${id}`)}
              newRecipient={() => history.push('/recipient/0')}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({ recipients: state.recipients.recipients });

const mapDispatchToProps = (dispatch, props) => ({
  createRecipient: recipient =>
    dispatch(
      createRecipient({
        recipient,
        companyCustomerId: props.companyCustomerId,
      })
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Place);
