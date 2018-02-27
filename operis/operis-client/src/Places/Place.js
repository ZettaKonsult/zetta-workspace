import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import PlaceForm from './Form/PlaceForm';
import { Button } from 'semantic-ui-react';

import { getPlaces } from '../reducers';
import { fetchAllRecipients } from './RecipientActions';
import RecipientCard from './RecipientCard';

class Place extends Component {
  async componentDidMount() {
    await fetchAllRecipients()(this.props.dispatch);
  }
  callback = () => {
    this.props.history.push('/place');
  };

  newRecipient = () => {
    this.props.history.push('/place/0');
  };

  render() {
    const { id } = this.props.match.params;
    return !!id ? (
      <PlaceForm callback={this.callback} id={this.props.match.params.id} />
    ) : (
      <div>
        <Button
          fluid
          primary
          onClick={this.newRecipient}
          content="New Recipient"
        />
        {renderRecipients(this.props.recipients, id =>
          this.props.history.push(`/place/${id}`)
        )}
      </div>
    );
  }
}

const renderRecipients = (recipients, onClick) =>
  recipients.map(recipient => (
    <RecipientCard
      key={recipient.id}
      recipient={recipient}
      onClick={() => onClick(recipient.id)}
    />
  ));

const mapStateToProps = (state, props) => ({
  recipients: getPlaces(state),
});

export default connect(mapStateToProps)(withRouter(Place));
