import React, { Component } from 'react';
import { connect } from 'react-redux';

class Transfer extends Component {
  render() {
    return (
      <div>
        Информация о туре под ID: {this.props.match.params.id}
      </div>
    );
  }
}

export default connect(({ auth }) => ({ isLoggedIn: auth.isLoggedIn }))(Transfer);