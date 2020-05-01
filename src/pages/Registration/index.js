import React from 'react';
import { connect } from 'react-redux';
// import { RegistrationForm } from "../../components";
import { actions } from '../../state-management';
import './style.css';


class Registration extends React.Component {
  constructor(props) {
    super(props);
  }

  replace() {
    this.props.history.replace('/');
  };

  regRequest = async (regData) => {
    await this.props.regRequest(regData);
    this.replace();
  };

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.replace();
    }
  }

  render() {
    return (
      <div className="login flex-direction-column flex-center">
        <div className="loginBox">
          <div className="loginBlock BGBlue flex-direction-column flex-center">
          </div>
          <div className="loginBlock flex-direction-column flex-center">
            {/*<RegistrationForm onFinish={this.regRequest}/>*/}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(({ auth }) => ({ isLoggedIn: auth.isLoggedIn }),
  { regRequest: actions.loginRequest }
)(Registration);
