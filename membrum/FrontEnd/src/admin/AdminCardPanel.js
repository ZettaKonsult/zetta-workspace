import React from 'react';

import Card from '../components/Card';

export default () => [
  <span key="A" className="AdminCard">
    <Card label="New Members" value="700" />
  </span>,
  <span key="B" className="AdminCard">
    <Card
      type="success"
      icon="shopping-cart"
      label="Registered Payments"
      value="500"
    />
  </span>,
  <span key="C" className="AdminCard">
    <Card
      type="warning"
      icon="tasks"
      label="Things that need approval"
      value="2"
    />
  </span>,
  <span key="D" className="AdminCard">
    <Card
      type="danger"
      icon="support"
      label="Flagged Members"
      value="12"
      link="/events"
    />
  </span>,
];
