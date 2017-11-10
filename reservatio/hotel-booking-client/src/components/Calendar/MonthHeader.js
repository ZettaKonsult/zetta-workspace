import React from 'react'
import styled from 'styled-components'

var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const DIV = styled.div`
  display: flex;
  background: rgba(26, 187, 156, 0.8);
  align-items: center;
  justify-content: center;
  text-align: center;
  user-select: none;
`
const Text = styled.span`
  color: rgba(255, 255, 255, 1);
  font-size: 1.5em;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  flex-grow: 1;
`
const Navigation = styled.span`
  padding: 1em 2em;
  color: rgba(0, 0, 0, 1);

  &:hover {
    color: rgba(100, 100, 100, 0.8);
  }

  &:active {
    color: rgba(200, 200, 200, 0.4);
  }
`

export default props =>
  <DIV>
    <Navigation onClick={e => props.prev(e)}>&#10094;</Navigation>
    <Text>
      {props.year + ' ' + months[props.month]}
      <br />
      {props.headerTitle}
    </Text>
    <Navigation onClick={e => props.next(e)}>&#10095;</Navigation>
  </DIV>
