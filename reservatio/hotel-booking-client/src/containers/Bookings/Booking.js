import styled from 'styled-components'
import React from 'react'
import { Link } from 'react-router-dom'

const Div = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  border: 1px solid lightgrey;
  padding: 0.5em 1em;
  margin: 0.5em;

  &:hover {
    background: white;
  }
`

const P = styled.p`padding: 0.2em 0.5em;`

const Booking = ({ start, end, name, paid, roomId }) =>
  <Link
    to={'/rooms/reserve/' + roomId + '/' + new Date(start).getTime()}
    style={{ textDecoration: 'none' }}
  >
    <Div>
      <P>
        Start: {start}
      </P>
      <P>
        End: {end}
      </P>
      <P>
        Name: {name}
      </P>
      <P>
        Paid: {paid ? 'Yes' : 'No'}
      </P>
      <P>
        Room number: {roomId}
      </P>
    </Div>
  </Link>

export default Booking
