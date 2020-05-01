import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header, Content } = Layout;

class Home extends Component {
  onSelect(e) {
    console.log(e);
  }

  render() {
    return (
      <>
        <Header>
          <div className="App-logo"/>
          <Menu theme="dark" mode="horizontal" onSelect={this.onSelect}>
            <Menu.Item key="1"><Link to={"/service/hotels"}>Hotels</Link></Menu.Item>
            <Menu.Item key="2"><Link to={"/service/tours"}>Tours</Link></Menu.Item>
            <Menu.Item key="3"><Link to={"/service/transfers"}>Transfers</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">Home</div>
        </Content>
      </>
    );
  }
}

export default Home;
