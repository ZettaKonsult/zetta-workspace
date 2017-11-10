import styled from 'styled-components'

const Span = styled.span`
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : 'white'};

  color: rgba(100, 100, 100, 0.7);
  text-transform: uppercase;
  text-align: center;
  font-size: 1.1em;
  user-select: none;

  &:hover {
    color: rgba(0, 0, 0, 1);
  }
`

export default Span
