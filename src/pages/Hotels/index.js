import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HotelsList } from '../../components/containers';

class Hotels extends Component {
  render() {
    return (
      <div>
        <HotelsList/>
      </div>
    );
  }
}

export default connect(({ auth }) => ({ isLoggedIn: auth.isLoggedIn }))(Hotels);
