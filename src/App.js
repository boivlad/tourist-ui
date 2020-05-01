import React from 'react';
import { connect } from "react-redux";
import { Layout, Menu, Breadcrumb } from 'antd';

import './App.css';

const { Header, Content, Footer } = Layout;

export default connect(({ loading, auth }) => ({ loading, auth }))(
  ({ children, loading, auth }) => (
    <>
      <Layout className="layout">
        {
          auth.isLoggedIn &&
          <Header>
            <div className="App-logo"/>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </Header>
        }
        {
          !auth.isLoggedIn ? (
            <Content className="App-content">{children}</Content>
          ) : (
            <Content style={{ padding: '0 50px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              <div className="site-layout-content">Content</div>
            </Content>
          )
        }

        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        {loading && <Loading isFullScreen={true} text="Sending transaction..."/>}
      </Layout>
    </>
  ))
