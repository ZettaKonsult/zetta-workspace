import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { SubmissionError } from 'redux-form';

import RecipientForm from './Form/RecipientForm';
import RecipientList from './RecipientList';

import {
  createRecipient,
  getRecipients,
  deleteRecipient,
} from './recipientReducer';

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
              onSubmit={this.createRecipient}
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
              onRemoveClick={id => this.props.deleteRecipient(id)}
            />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({ recipients: getRecipients(state) });

const mapDispatchToProps = (dispatch, props) => ({
  createRecipient: recipient =>
    dispatch(
      createRecipient({
        recipient,
        companyCustomerId: props.companyCustomerId,
      })
    ),
  deleteRecipient: id => dispatch(deleteRecipient(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Place));
