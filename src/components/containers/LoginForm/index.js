import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import './styles.css';


class LoginForm extends Component {
  constructor(props) {
    super(props);
  }

  onFinish(values) {
    console.log('Received values of form: ', values);
  };

  render() {
    return (
      <Form
        name="normal_login"
        className="login-form"
        onFinish={this.onFinish}
      >
        <label className='loginLabel'>Sign In</label>
        <Form.Item
          name="username"
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
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to={"registration"}>register now!</Link>
        </Form.Item>
      </Form>
    );
  }
}

export default LoginForm;