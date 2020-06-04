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
      <Layout className="layout"> <Header>
        <Row>
          <Col span={5}>
            <img src={Logo} alt="Logo" width="200" height="40" title="TouristUA"/>
          </Col>
          <Col span={10} className='menuHeader'>
            <Link className='menuHeaderItem' to={'/hotels'}>Hotels</Link>
            <Link className='menuHeaderItem' to={'/tours'}>Tours</Link>
            <Link className='menuHeaderItem' to={'/transfers'}>Transfers</Link>
          </Col>

          {
            auth.isLoggedIn
              ? <Col span={2} offset={7}> <Button onClick={async() => {
                await logout();
              }} type="primary" danger>
                Logout
              </Button>
              </Col> : <Col span={5} offset={4}>
                <Button href={'/login'} type="primary">
                  Login
                </Button> && <Button href={'/registration'} type="primary">
                Registration
              </Button>
              </Col>
          }
        </Row>
      </Header>
        <Content className="App-content">
          <div className="site-layout-content">{children}</div>
        </Content>
      </Layout>
    </>
  ),
);
