import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { SubmissionError } from 'redux-form';

import RecipientForm from './Form/RecipientForm';
import RecipientList from './RecipientList';

import { createRecipient, listRecipients } from '../services';
import { fetchRecipients } from './recipientReducer';

class Place extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      error: undefined,
      recipient: {},
    };
  }

  async componentDidMount() {
    this.props.fetchRecipients({ companyCustomerId: '123456' });
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
    const { error, isLoading } = this.state;
    const { match, history, recipients } = this.props;

    if (error || recipients.length === 0) {
      return <div>{error}</div>;
    }
    return (
      <div>
        <Route
          path={`${match.path}/:id`}
          render={props => (
            <RecipientForm
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

export default connect(state => ({ recipients: state.recipients.recipients }), {
  fetchRecipients,
})(Place);
