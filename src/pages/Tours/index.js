import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ToursList } from '../../components/containers';

class Tours extends Component {
  render() {
    return (
      <div>
        <ToursList/>
      </div>
    );
  }
}

export default connect(({ auth }) => ({ isLoggedIn: auth.isLoggedIn }))(Tours);
