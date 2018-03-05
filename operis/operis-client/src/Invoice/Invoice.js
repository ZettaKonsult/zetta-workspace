import React, { Component } from 'react';
import styled from 'styled-components';
import { API } from 'aws-amplify';

export default class Invoice extends Component {
  constructor() {
    super();
    this.state = {
      invoices: [],
    };
  }

  async componentDidMount() {
    const invoices = await API.get(
      'invoice',
      `/invoice/${this.props.companyCustomerId}`,
      {
        header: {},
      }
    );
    this.setState({ invoices });
  }

  handleSendInvoice = async id => {
    await API.post('invoice', `/invoice/mail`, {
      header: {},
      body: {
        companyCustomerId: this.props.companyCustomerId,
        invoiceId: id,
      },
    });
  };

  render() {
    if (this.state.invoices.length === 0) {
      return <p>...Loading...</p>;
    }
    return (
      <div>
        {this.state.invoices.map((invoice, i) => (
          <Wrapper key={i}>
            <p>{invoice.id}</p>
            <p>
              skapad: {new Date(invoice.createdAt).toISOString().split('T')[0]}
            </p>
            <p>Recipient: {invoice.recipientId}</p>
            <button onClick={() => this.handleSendInvoice(invoice.id)}>
              Send invoice by email
            </button>
          </Wrapper>
        ))}
      </div>
    );
  }
}

const Wrapper = styled.div`
  background: lightgrey;
  border: 1px solid black;
  padding: 1em;
  display: flex;
  flex-direction: column;
`;
