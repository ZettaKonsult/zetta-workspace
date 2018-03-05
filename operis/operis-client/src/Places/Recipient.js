import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import PlaceForm from './Form/PlaceForm';
import RecipientList from './RecipientList';
import { saveRecipientAPI } from './recipientApi';

class Place extends Component {
  postRecipient = async recipient => {
    try {
      const result = await saveRecipientAPI(
        recipient,
        'cjdvmtzgd000104wgiubpx9ru'
      );
      this.props.updateRecipients(result);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { recipients, match, history } = this.props;
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
              id={match.params.id}
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
