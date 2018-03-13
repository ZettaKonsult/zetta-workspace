import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { SubmissionError } from 'redux-form';

import PlaceForm from './Form/PlaceForm';
import RecipientList from './RecipientList';
import { saveRecipientAPI } from './recipientApi';

class Place extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      error: undefined,
    };
  }

  postRecipient = async recipient => {
    this.setState(state => ({ ...state, isLoading: true }));

    try {
      const result = await saveRecipientAPI(
        recipient,
        this.props.companyCustomerId
      );
      this.props.updateRecipients(result);
    } catch (error) {
      throw new SubmissionError({ _error: error.message });
    } finally {
      this.setState(state => ({ ...state, isLoading: false }));
    }
  };

  render() {
    const { error, isLoading } = this.state;
    const { recipients, match, history } = this.props;

    if (error) {
      return <div>{error}</div>;
    }
    return (
      <div>
        <Route
          path={`${match.path}/:id`}
          render={props => (
            <PlaceForm
              onSubmit={async values => {
                await this.postRecipient(values);
                history.push('/recipient');
              }}
              isLoading={isLoading}
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

export default Place;
