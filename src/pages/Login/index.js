import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../../state-management';
import { LoginForm } from '../../components/containers';
import { encryptData } from '../../utils/functions/auth';
import './styles.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.loginRequest = this.loginRequest.bind(this);
  }

  replace() {
    this.props.history.replace('/');
  }

  async loginRequest({ name, password }) {
    const enPassword = encryptData(password);
    if (await this.props.loginRequest({ name, enPassword })) {
      this.replace();
    }
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.replace();
    }
  }

  render() {
    return (
      <div className="formPosition">
        <LoginForm onFinish={this.loginRequest}/>
      </div>
    );
  }
}

export default connect(({ auth }) => ({ isLoggedIn: auth.isLoggedIn }),
  { loginRequest: actions.loginRequest })(Login);
