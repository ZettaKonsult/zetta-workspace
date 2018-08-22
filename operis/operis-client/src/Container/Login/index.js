import React from 'react';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';

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
      await Auth.signIn(this.state.email, this.state.password);
      this.props.signIn();
      alert('Logged in');
    } catch (e) {
      alert(e.message);
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <input id="email" onChange={this.handleChange} />
        <input id="password" onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  signIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
