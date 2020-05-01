import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../state-management';
import { LoginForm } from '../../components/containers/';
import { encryptData } from '../../utils/functions/auth';
import './styles.css';

class Login extends Component {
  replace() {
    this.props.history.replace('/');
  };

  loginRequest = async ({ name, password }) => {
    const enPassword = encryptData(password);
    await this.props.loginRequest({ name, enPassword });
    this.replace();
  };

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.replace();
    }
  }

  render() {
    return (
      <div className="login">
        <LoginForm onFinish={this.loginRequest}/>
      </div>
    );
  }
}

export default connect(({ auth }) => ({ isLoggedIn: auth.isLoggedIn }),
  { loginRequest: actions.loginRequest }
)(Login);
