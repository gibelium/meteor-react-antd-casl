/** @format */

import '../../ui/styles/components/RootComponent.less';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Layout } from 'antd/lib/index';
// import { AbilityContext } from '../../casl/AbilityContext';
// import { createContextualCan } from '@casl/react';

class RootComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout className="casl-content-layout">
        <Layout.Content className="casl-content-main-area">
          <ul className="list">
            <li className="list-element">
              <Link to="/simple">
                <Icon type="android" />
                <span> Simple Content</span>
              </Link>
            </li>
            <li className="list-element">
              <Link to="/menu">
                <Icon type="menu-unfold" />
                <span> Side Menu</span>
              </Link>
            </li>
          </ul>
        </Layout.Content>
      </Layout>
    );
  }
}
export { RootComponent };
