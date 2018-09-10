import React from 'react';
import { connect } from 'react-redux';

import { createInvoiceGroup } from '../Invoice/invoiceGroupActions';

class InvoiceGroup extends React.PureComponent {
  state = {
    name: '',
    value: '',
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div>
        <h1>Invoice Groups</h1>
        <div>
          <input name="name" onChange={this.onChange} />
          <input name="value" onChange={this.onChange} />
          <button
            onClick={() =>
              this.props.createInvoiceGroup(this.state.name, this.state.value)
            }
          >
            Create Group
          </button>
        </div>
        {this.props.invoiceGroups.map((group, i) => (
          <div key={i}>
            <p>{group.name}</p>
            <p>{group.id}</p>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  invoiceGroups: [{ name: 'test', id: 1000 }],
});

const mapDispatchToProps = { createInvoiceGroup };

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceGroup);
