import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signOut } from '../../state/appReducer';

class Logout extends React.PureComponent {
  componentDidMount() {
    this.props.signOut();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
