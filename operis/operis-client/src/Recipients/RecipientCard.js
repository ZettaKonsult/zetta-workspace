import React from 'react';
import { Icon } from 'semantic-ui-react';

const RecipientCard = ({ id, recipient, onClick, onRemoveClick }) => (
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
  >
    <strong style={{ fontSize: '1.2em' }} onClick={onClick}>
      {recipient.firstName} {recipient.lastName}
    </strong>
    <Icon onClick={onRemoveClick} link name="close" />
  </div>
);

export default RecipientCard;
