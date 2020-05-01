import React from 'react';
import { connect } from "react-redux";
import { Layout, Menu } from 'antd';

import './App.css';
import { Link } from 'react-router-dom';

const { Header, Content } = Layout;

export default connect(({ loading, auth }) => ({ loading, auth }))(
  ({ children, loading, auth }) => (
    <>
      <Layout className="layout">
        {
          auth.isLoggedIn &&
          <Header>
            <div className="App-logo"/>
            <Menu theme="dark" mode="horizontal">
              <Menu.Item key="1"><Link to={"/hotels"} id={0}>Hotels</Link></Menu.Item>
              <Menu.Item key="2"><Link to={"/tours"} id={1}>Tours</Link></Menu.Item>
              <Menu.Item key="3"><Link to={"/transfers"} id={2}>Transfers</Link></Menu.Item>
            </Menu>
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
        {loading && <Loading isFullScreen={true} text="Sending transaction..."/>}
      </Layout>
    </>
  ))
