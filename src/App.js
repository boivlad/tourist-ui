import React from 'react';
import { connect } from 'react-redux';
import {
  Button, Col, Layout, Row,
} from 'antd';

import './App.css';
import { Link } from 'react-router-dom';
import { actions } from './state-management';
import Logo from './assets/images/logo.png';

const { Header, Content } = Layout;

export default connect(({ loading, auth }) => ({ loading, auth }), {
  logout: actions.logout,
})(
  ({ children, auth, logout }) => (
    <>
      <Layout className="layout">
        {
          auth.isLoggedIn
          && <Header>
            <Row>
              <Col span={5}>
                <img src={Logo} alt="Logo" width="200" height="40" title="TouristUA"/>
              </Col>
              <Col span={10} className='menuHeader'>
                <Link className='menuHeaderItem' to={'/hotels'}>Hotels</Link>
                <Link className='menuHeaderItem' to={'/tours'}>Tours</Link>
                <Link className='menuHeaderItem' to={'/transfers'}>Transfers</Link>
              </Col>
              <Col span={2} offset={7}>
                <Button onClick={async() => { await logout(); }} type="primary" danger>
                Logout
              </Button>
              </Col>
            </Row>
          </Header>
        }
        {
          !auth.isLoggedIn ? (
            <Content className="App-content">{children}</Content>
          ) : (
            <Content style={{ padding: '0 50px' }}>
              <div className="site-layout-content">{children}</div>
            </Content>
          )
        }
      </Layout>
    </>
  ),
);
