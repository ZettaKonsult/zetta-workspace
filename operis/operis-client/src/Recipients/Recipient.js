import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { SubmissionError } from 'redux-form';

import PlaceForm from './Form/PlaceForm';
import RecipientList from './RecipientList';

import {
  createRecipient,
  listRecipients,
  updateRecipient,
  getRecipient,
  deleteRecipent,
} from '../services';

class Place extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      error: undefined,
      recipients: [],
      recipient: {
        address: 'Road 234A',
        city: 'RecipientCity',
        createdAt: 2345678901,
        email: 'firstName@recipient.com',
        firstName: 'RecipientFirst',
        lastName: 'RecipientLast',
        mobile: '+46762345678',
        ssn: '1234567890',
        zipcode: '12345',
      },
    };
  }
  async componentDidMount() {
    const results = await listRecipients({ companyCustomerId: '123456' });
    console.log(results);
    this.setState(state => ({ recipients: [...state.recipients, ...results] }));
  }

  createRecipient = async () => {
    this.setState(state => ({ ...state, isLoading: true }));

    try {
      const result = await createRecipient({
        recipient: this.state.recipient,
        companyCustomerId: '123456',
      });
      console.log(result);
      this.setState(state => ({ recipients: [...state.recipients, result] }));
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
