import React, { Component } from 'react';
import styled from 'styled-components';
import { API } from 'aws-amplify';

export default class Invoice extends Component {
  constructor() {
    super();
    this.state = {
      invoices: [],
    };
    this.companyCustomerId = 'cjdvmtzgd000104wgiubpx9ru';
  }

  async componentDidMount() {
    const invoices = await API.get(
      'invoice',
      `/invoice/${this.companyCustomerId}`,
      {
        header: {},
      }
    );
    this.setState({ invoices });
  }

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
    if (this.state.invoices.length === 0) {
      return <p>...Loading...</p>;
    }
    return (
      <div>
        {this.state.invoices.map((invoice, i) => (
          <InvoiceRow key={i}>{invoice.id}</InvoiceRow>
        ))}
      </div>
    );
  }
}

const InvoiceRow = styled.div`
  background: lightgrey;
  border: 1px solid black;
  padding: 1em;
`;
