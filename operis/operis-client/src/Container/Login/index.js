import React from 'react';
import { connect } from 'react-redux';

import LoginForm from './LoginForm'
import { signIn } from '../../state/appReducer';

class Login extends React.PureComponent {
  state = {
    email: '',
    password: '',
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    try {
      this.props.signIn(this.state.email, this.state.password);
    } catch (e) {
      alert(e.message);
    }
  };

  render() {
    return <LoginForm />
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  signIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
