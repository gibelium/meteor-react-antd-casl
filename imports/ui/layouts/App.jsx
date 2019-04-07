/** @format */

import '../styles/layouts/App.less';

import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Layout, Menu } from 'antd/lib/index';
import { LoginPage } from '../pages/LoginPage.jsx';
import { NotFoundPage } from '../pages/NotFoundPage.jsx';
import { MenuComponent } from '../components/MenuComponent.jsx';
import { RootComponent } from '../components/RootComponent.jsx';
import { SimpleComponent } from '../components/SimpleComponent.jsx';
import { AbilityContext } from '../../casl/AbilityContext';

import { Ability } from '@casl/ability';
import PropTypes from 'prop-types';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abilities: this._createAbility(), // Create empty CASL abilities
    };
  }

  // ##### Lifecycle #####

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.currentUser !== prevProps.currentUser) {
      // this.setState({ abilities: this.createAbility() }); // Set new CASL `Ability instance
      this._updateAbilities(); // Reuse and update existing ``ASL `Ability` instance
    }
  }

  // ##### CASL ability handling #####

  _createAbility() {
    const { currentUser } = this.props;
    return new Ability(currentUser ? currentUser.abilities : []);
  }

  _updateAbilities() {
    const { currentUser } = this.props;
    if (currentUser) {
      this.state.abilities.update(currentUser.abilities);
    }
  }

  // ##### User interactions #####

  // noinspection JSUnusedLocalSymbols
  handleMenuOnClick = e => {
    // currently there is nothing to do here
  };

  handleLogout = e => {
    if (e.key === 'logout') {
      Meteor.logout();
    }
  };

  // ##### Rendering #####

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

  renderContent(location) {
    return (
      <Layout
        style={{
          height: '100vh',
        }}>
        <Layout.Header className="app-header">
          <Menu theme="dark" onClick={this.handleMenuOnClick} selectedKeys={[location.pathname]} mode="horizontal">
            <Menu.Item key="home">
              <Link to="/">Home</Link>
            </Menu.Item>
            {Meteor.user() == null ? (
              <Menu.Item key="login">
                <Link to="/login">Login</Link>
              </Menu.Item>
            ) : (
              <Menu.Item key="logout" onClick={this.handleLogout}>
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
            <Route exact path="/" component={RootComponent} />
            <Route exact path="/simple" component={SimpleComponent} />
            <Route exact path="/menu" component={MenuComponent} />
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
