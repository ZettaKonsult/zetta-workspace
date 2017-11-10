import React from 'react'

import Members from './Members'
import Mail from './Mail'
import Payment from './Payment'

const Statistics = ({ filter, data }) => (
  <div className="statistics">
    {filter === 'mail' || filter === 'all' ? <Mail data={data.mail} /> : ''}
    {filter === 'members' || filter === 'all' ? (
      <Members data={data.members} />
    ) : (
      ''
    )}
    {filter === 'payment' || filter === 'all' ? (
      <Payment data={data.payment} />
    ) : (
      ''
    )}
  </div>
)

export default Statistics
