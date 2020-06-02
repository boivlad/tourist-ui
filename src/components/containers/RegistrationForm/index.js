import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button, DatePicker, Form, Input,
} from 'antd';
import { encryptData } from '../../../utils/functions/auth';
import './styles.css';

class RegistrationForm extends Component {
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
    Object.assign(values, {
      dateOfBirth: values.dateOfBirth._i,
      password: encryptData(values.password),
      confirm: undefined,
    });
    this.toggleLoading();
    this.props.onFinish(values);
    this.toggleLoading();
  }

  render() {
    return (
      <Form
        name="register"
        className="registrationForm"
        onFinish={this.onFinish}
      >
        <label className='formLabel'>Registration</label>
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[
            {
              required: true,
              message: 'Please input your first name!',
            },
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[
            {
              required: true,
              message: 'Please input your last name!',
            },
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="userName"
          label="Username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
              whitespace: true,
            },
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please input your email!',
            },
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
          ]}
        >
          <Input
            addonBefore={'+38'}
            style={{
              width: '100%',
            }}
          />
        </Form.Item>
        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
              message: 'Please input your address!',
            },
          ]}
        >
          <Input/>
        </Form.Item>
        <Form.Item
          name="dateOfBirth"
          label="Date of Birth"
          rules={[
            {
              required: true,
              message: 'Please select your date of Birth!',
            },
          ]}>
          <DatePicker style={{ width: '100%' }}/>
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password/>
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject('The two passwords that you entered do not match!');
              },
            }),
          ]}
        >
          <Input.Password/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="formButton">
            Registration
          </Button>
          Or <Link to={'login'}>logIn!</Link>
        </Form.Item>
      </Form>
    );
  }
}

export default RegistrationForm;
