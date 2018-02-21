import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import PlaceForm from './Form/PlaceForm';
import { Button, Icon } from 'semantic-ui-react';

import { getPlaces } from '../reducers';

class Place extends Component {
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
        {renderRecipients(this.props.recipients)}
      </div>
    );
  }
}

const renderRecipients = recipients =>
  recipients.map(recipient => (
    <RecipientCard
      key={recipient.id}
      recipient={recipient}
      onClick={() => {
        this.props.history.push(`/place/${recipient.id}`);
      }}
    />
  ));

const RecipientCard = ({ id, recipient, onClick }) => (
  <div
    style={{
      padding: '0.5em',
      border: '1px solid grey',
      margin: '0.2em',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: '5px',
    }}
    onClick={onClick}
  >
    <strong style={{ fontSize: '1.2em' }}>
      {recipient.firstName} {recipient.lastName}
    </strong>
    <Icon onClick={() => console.log('TODO')} link name="close" />
  </div>
);

const mapStateToProps = (state, props) => ({
  recipients: getPlaces(state),
});

export default connect(mapStateToProps)(withRouter(Place));
