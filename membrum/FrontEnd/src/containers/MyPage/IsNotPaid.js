import React from 'react'

import Button from '../../components/Button'

const style = {
  display: 'flex',
  flexDirection: 'column',
  border: '1px dotted grey',
  margin: '1em',
  padding: '1em',
  background: 'var(--danger-light)'
}

export default ({ initiatePaymentProccess }) => (
  <div style={style}>
    <h3>Payment status</h3>

    <p>We have no registered payment for this semester</p>

    <div className="ButtonGroup">
      <Button large onClick={initiatePaymentProccess}>
        Pay semester fee
      </Button>
    </div>
  </div>
)
