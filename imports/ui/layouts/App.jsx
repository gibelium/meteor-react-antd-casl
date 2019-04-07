/** @format */

import '../styles/layouts/App.less';

import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Layout, Menu } from 'antd/lib/index';
import { LoginPage } from '../pages/LoginPage.jsx';
import { NotFoundPage } from '../pages/NotFoundPage.jsx';
import { ContentComponent } from '../components/ContentComponent.jsx';
import { AbilityContext } from '../../casl/AbilityContext';

import { Ability } from '@casl/ability';
import PropTypes from 'prop-types';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abilities: this.createAbility(),
    };
  }

  renderRedirect(location) {
    const { redirectTo } = this.state;
    const { pathname } = location;

    if (Meteor.user() == null && !Meteor.loggingIn() && pathname !== '/login') {
      return <Redirect to="/login" />;
    }

    let redirect = null;
    if (redirectTo && redirectTo !== pathname) {
      redirect = <Redirect to={pathname} />;
    }
    return redirect;
  }

  // noinspection JSUnusedLocalSymbols
  _handleMenuItemClick = e => {
    // currently there is nothing to do here
  };

  _logoutUser = e => {
    if (e.key === 'logout') {
      Meteor.logout();
    }
  };

  updateAbilities() {
    const { currentUser } = this.props

    if (currentUser) {
      this.state.abilities.update(currentUser.abilities)
    }
  }

  createAbility() {
    const { currentUser } = this.props

    return new Ability(currentUser ? currentUser.abilities : [])
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUser !== prevProps.currentUser) {
      this.setState({ abilities: this.createAbility() })
      // or you can reuse existing `Ability` instance
      // this.updateAbilities()
    }
  }

  renderContent(location) {
    return (
      <Layout
        style={{
          height: '100vh',
        }}>
        <Layout.Header className="app-header">
          <Menu theme="dark" onClick={this._handleMenuItemClick} selectedKeys={[location.pathname]} mode="horizontal">
            {Meteor.user() == null ? (
              <Menu.Item key="login">
                <Link to="/login">Login</Link>
              </Menu.Item>
            ) : (
              <Menu.Item key="logout" onClick={this._logoutUser}>
                Logout
              </Menu.Item>
            )}
          </Menu>
        </Layout.Header>
        <Layout.Content
          style={{
            margin: '0',
          }}>
          <Switch>
            <Route exact path="/" component={ContentComponent} />
            <Route exact path="/login" component={LoginPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Layout.Content>
      </Layout>
    );
  }

  render() {
    return (
      <AbilityContext.Provider value={this.state.abilities}>
        <BrowserRouter>
          <Route render={({ location }) => this.renderRedirect(location) || this.renderContent(location)} />
        </BrowserRouter>
      </AbilityContext.Provider>
    );
  }
}

App.propTypes = {
  currentUser: PropTypes.object,
};

export { App };
