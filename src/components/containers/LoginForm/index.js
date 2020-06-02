import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import './styles.css';


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
    this.onFinish = this.onFinish.bind(this);
  }

  toggleLoading() {
    this.setState((prevState) => ({
      isLoading: !prevState.isLoading,
    }));
  }

  onFinish(values) {
    this.toggleLoading();
    this.props.onFinish(values);
    this.toggleLoading();
  }

  render() {
    return (
      <Form
        name="loginForm"
        className="loginForm"
        onFinish={this.onFinish}
      >
        <label className='formLabel'>Login</label>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input placeholder="Username"/>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password"/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="formButton">
            Log in
          </Button>
          Or <Link to={'registration'}>register now!</Link>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(({ auth }) => ({ isLoggedIn: auth.isLoggedIn }))(LoginForm);
