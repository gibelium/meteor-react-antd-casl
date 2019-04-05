/** @format */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Form, Icon, Input, Button } from 'antd';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
  }

  _handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('Received values of form: ', values);

      if (!err) {
        Meteor.loginWithPassword(values.username, values.password, err => {
          if (err) {
            this.props.form.resetFields();
            this.setState({
              errors: {
                none: err.reason,
              },
            });
          } else {
            // Redirect to content page
            this.props.history.push('/');
          }
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="vertical" onSubmit={this._handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="username" />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        {/*<Form.Item>*/}
        {/*  {getFieldDecorator('remember', {*/}
        {/*    valuePropName: 'checked',*/}
        {/*    initialValue: true,*/}
        {/*  })(<Checkbox>Remember me</Checkbox>)}*/}
        {/*</Form.Item>*/}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
        {/*<Form.Item>*/}
        {/*  <a className="login-form-forgot" href="">*/}
        {/*    Forgot password*/}
        {/*  </a>*/}
        {/*</Form.Item>*/}
      </Form>
    );
  }
}

LoginForm.propTypes = {
  form: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const WrappedLoginForm = Form.create({ name: 'login-form' })(LoginForm);
export { WrappedLoginForm };
