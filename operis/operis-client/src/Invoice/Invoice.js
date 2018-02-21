import React, { Component } from 'react';
import styled from 'styled-components';

export default class Invoice extends Component {
  state = {
    rows: [1, 2, 3, 4, 5],
    checked: [],
  };

  handleCheckbox(value) {
    this.setState(state => {
      if (state.checked.includes(value)) {
        return { checked: state.checked.filter(id => id !== value) };
      } else {
        return { checked: [...state.checked, value] };
      }
    });
  }
  render() {
    return (
      <div>
        {this.state.rows.map(row => (
          <InvoiceRow>
            <input type="checkbox" onClick={() => this.handleCheckbox(row)} />
            {row}
          </InvoiceRow>
        ))}
        {this.state.checked.map(id => <p>{id}</p>)}
      </div>
    );
  }
}

const InvoiceRow = styled.div`
  background: lightgrey;
  border: 1px solid black;
  padding: 1em;
`;
