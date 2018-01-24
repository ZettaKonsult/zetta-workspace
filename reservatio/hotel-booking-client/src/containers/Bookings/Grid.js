import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1em 1em;
  grid-template-areas: ' today tomorrow ' ' restdays  restdays     ';
  text-align: center;
`;

export default Grid;
