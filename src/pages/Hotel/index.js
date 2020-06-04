import React, { Component } from 'react';
import { connect } from 'react-redux';

class Hotel extends Component {
  render() {
    return (
      <div>
        Информация об отеле под ID: {this.props.match.params.id}
      </div>
    );
  }
}

export default connect(({ auth }) => ({ isLoggedIn: auth.isLoggedIn }))(Hotel);
