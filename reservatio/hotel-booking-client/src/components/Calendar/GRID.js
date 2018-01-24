import styled from 'styled-components';

const GRID = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.size}, 1fr);
  font-size: 0.8em;
  grid-row-gap: 0.5em;
`;

export default GRID;
