/** @format */

import '../styles/pages/LoginPage.less';

import { WrappedLoginForm } from '../components/LoginForm.jsx';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="wrapper-login">
        <h1 className="title-login">Login</h1>
        <p />
        <WrappedLoginForm history={this.props.history} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export { LoginPage };
