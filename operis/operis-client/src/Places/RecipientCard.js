import React from 'react';
import { Icon } from 'semantic-ui-react';

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

export default RecipientCard;
