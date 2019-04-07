/** @format */

import '../../ui/styles/components/MenuComponent.less';

import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { createContextualCan } from '@casl/react';
import { AbilityContext } from '../../casl/AbilityContext';

class MenuComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // FIXME: Change to central Can component when casl developer answered my issue
    const Can = createContextualCan(AbilityContext.Consumer);
    return (
      <Layout
        style={{
          minHeight: '100vh',
        }}>
        <Layout.Content
          style={{
            margin: '0',
          }}>
          <h3
            style={{
              textAlign: 'center',
              marginTop: '150px',
            }}>
            Page containing a side menu
          </h3>
        </Layout.Content>

        <Layout.Sider width="300px" collapsible="false" trigger={null}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['config', 'admin']}>
            {/* FIXME: <Can/> does not work here... :-( */}
            {/* FIXME: Might be related to: https://github.com/ant-design/ant-design/issues/4853 and https://stackoverflow.com/questions/50573609/fail-creating-a-submenu-in-a-component-with-antd */}
            <Can I="access" on="Configuration">
              <Menu.SubMenu
                title={
                  <span>
                    <Icon type="tools" />
                    <span>Configuration</span>
                  </span>
                }
                key="config">
                <Menu.Item key="config-1" tabIndex={0}>
                  <Icon type="warning" />
                  <span>Config 01</span>
                </Menu.Item>
                <Menu.Item key="config-2" tabIndex={0}>
                  <Icon type="exclamation" />
                  <span>Config 02</span>
                </Menu.Item>
              </Menu.SubMenu>
              <Menu.Divider />
            </Can>

            {/*<Can I="access" on="Administration">*/}
            <Menu.SubMenu
              title={
                <span>
                  <Icon type="tools" />
                  <span>Administration</span>
                </span>
              }
              key="admin">
              <Menu.Item key="users" tabIndex={0}>
                <Icon type="android" />
                <span>User Administration</span>
              </Menu.Item>
              <Menu.Item key="permissions" tabIndex={0}>
                <Icon type="lock" />
                <span>Permissions</span>
              </Menu.Item>
            </Menu.SubMenu>
            {/*</Can>*/}
          </Menu>
        </Layout.Sider>
      </Layout>
    );
  }
}

export { MenuComponent };
