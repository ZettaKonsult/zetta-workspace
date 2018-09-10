import React from 'react';
import { connect } from 'react-redux';

import { createGroup } from '../Invoice/invoiceGroupActions';

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
              this.props.createGroup(this.state.name, this.state.value)
            }
          >
            Create Group
          </button>
        </div>
        {this.props.groups.map((group, i) => (
          <div key={i}>
            <p>name: {group.name}</p>
            <p>last id: {group.currentId}</p>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const allIds = state.invoiceGroup.allIds;
  const byIds = state.invoiceGroup.byIds;

  return { groups: allIds.map(id => byIds[id]) };
};

const mapDispatchToProps = { createGroup };

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceGroup);
