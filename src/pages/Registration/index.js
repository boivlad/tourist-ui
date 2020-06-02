import React from 'react';
import { connect } from 'react-redux';
import { RegistrationForm } from '../../components';
import { actions } from '../../state-management';
import './style.css';

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.regRequest = this.regRequest.bind(this);
  }

  replace() {
    this.props.history.replace('/');
  }

  async regRequest(regData) {
    await this.props.regRequest(regData);
    this.replace();
  }

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.replace();
    }
  }

  render() {
    return (
      <div className="formPosition">
        <RegistrationForm onFinish={this.regRequest}/>
      </div>
    );
  }
}

export default connect(({ auth }) => ({ isLoggedIn: auth.isLoggedIn }),
  { regRequest: actions.registrationRequest })(Registration);
