import React from "react"

import Card from "../../components/Card"

export default () => [
  <Card key="A" label="New Members" value="700" />,
  <Card
    key="B"
    type="success"
    icon="shopping-cart"
    label="Registered Payments"
    value="500"
  />,
  <Card
    key="C"
    type="warning"
    icon="tasks"
    label="Things that need approval"
    value="2"
  />,
  <Card
    key="D"
    type="danger"
    icon="support"
    label="Flagged Members"
    value="12"
    link="/events"
  />
]
