import React, { Component } from 'react';
import { connect } from 'react-redux';

import { membersFetch } from './membersActions';
import { loadUserProfile } from '../user/profileActions';
import { getVisibleMembers } from './membersReducer';

let VisibleMembersList = props =>
  props.members.map(member => (
    <div key={member.ssn} onClick={() => props.redirect(member.ssn)}>
      {member.firstName}
    </div>
  ));

const mapStateToProps = (state, props) => ({
  members: getVisibleMembers(state.membersReducer, props.value),
});

VisibleMembersList = connect(mapStateToProps)(VisibleMembersList);

class MemberFind extends Component {
  constructor() {
    super();
    this.state = { value: '' };
  }
  handleChange = value => {
    this.setState({ value });
  };
  render() {
    const { history, membersFetch, loadUserProfile } = this.props;
    return (
      <div>
        <button onClick={membersFetch}>Fetch Members</button>
        <input
          value={this.state.value}
          onChange={e => this.handleChange(e.target.value)}
          type="text"
        />
        <h3>Members</h3>
        <VisibleMembersList
          value={this.state.value}
          redirect={userId => {
            loadUserProfile(userId);
            history.push('/registration');
          }}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  loadUserProfile,
  membersFetch,
};

export default connect(undefined, mapDispatchToProps)(MemberFind);
