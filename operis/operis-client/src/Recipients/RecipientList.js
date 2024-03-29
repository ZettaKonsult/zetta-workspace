import React from 'react';
import { Button } from 'semantic-ui-react';

import RecipientCard from './RecipientCard';

const RecipientList = ({
  recipients,
  onClick,
  newRecipient,
  onRemoveClick,
}) => (
  <div>
    <Button fluid primary onClick={newRecipient} content="New Recipient" />
    {recipients.map(recipient => (
      <RecipientCard
        key={recipient.id}
        recipient={recipient}
        onClick={() => onClick(recipient.id)}
        onRemoveClick={() => onRemoveClick(recipient.id)}
      />
    ))}
  </div>
);

export default RecipientList;
