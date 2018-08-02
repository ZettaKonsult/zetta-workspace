import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { SubmissionError } from 'redux-form';

import PlaceForm from './Form/PlaceForm';
import RecipientList from './RecipientList';

import { createRecipient, listRecipients } from '../services';

class Place extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      error: undefined,
      recipients: [],
      recipient: {},
    };
  }
  async componentDidMount() {
    const results = await listRecipients({ companyCustomerId: '123456' });
    console.log(results);
    this.setState(state => ({ recipients: [...state.recipients, ...results] }));
  }

  createRecipient = async recipient => {
    this.setState(state => ({ ...state, isLoading: true }));

    try {
      const result = await createRecipient({
        recipient: recipient,
        companyCustomerId: '123456',
      });

      this.setState(state => ({
        recipients: [
          ...state.recipients.filter(r => r.id !== result.id),
          result,
        ],
      }));
    } catch (error) {
      throw new SubmissionError({ _error: error.message });
    } finally {
      this.setState(state => ({ ...state, isLoading: false }));
    }
  };

  render() {
    const { error, isLoading, recipients } = this.state;
    const { match, history } = this.props;

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
                await this.createRecipient(values);
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
