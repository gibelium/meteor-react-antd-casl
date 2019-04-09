/** @format */

import '../../ui/styles/components/SimpleComponent.less';

import React, { Component } from 'react';
import { Layout } from 'antd/lib/index';
import { Can } from '../../casl/AbilityContext';

class SimpleComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout className="casl-content-layout">
        <Layout.Content className="casl-content-main-area">
          <Can I="access" this="admin-content">
            <div id="admin-content" className="content-part">
              <h1>Admin Content</h1>
              <ul>
                <li onDoubleClick={this.edit}>Admin Test Content 01</li>
                <li>Admin Test Content 02</li>
              </ul>
            </div>
          </Can>

          <Can I="access" this="manager-content">
            <div id="manager-content" className="content-part">
              <h1>Manager Content</h1>
              <ul>
                <li>Manager Test Content 01</li>
                <li>Manager Test Content 02</li>
              </ul>
            </div>
          </Can>

          <div id="user-content" className="content-part">
            <h1>User Content</h1>
            <ul>
              <li>User Test Content 01</li>
              <li>User Test Content 02</li>
            </ul>
          </div>
        </Layout.Content>
      </Layout>
    );
  }
}

export { SimpleComponent };
