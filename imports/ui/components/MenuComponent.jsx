/** @format */

import '../../ui/styles/components/MenuComponent.less';

import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Can } from '../../casl/AbilityContext';

class MenuComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // FIXME: As workaround for ant-design issue #4853 we need to define the submenus separately an propagate the props
    // => https://github.com/ant-design/ant-design/issues/4853
    // => https://github.com/ant-design/ant-design/issues/7097
    // => https://stackoverflow.com/questions/50573609/fail-creating-a-submenu-in-a-component-with-antd

    // ### User Menu
    const UserMenu = ({ ...props }) => {
      return (
        <Menu.SubMenu {...props} title={<span>User</span>} key="user">
          <Menu.Item key="content01" tabIndex={0}>
            <Icon type="retweet" />
            <span>Content 01</span>
          </Menu.Item>
          <Menu.Item key="content02" tabIndex={0}>
            <Icon type="swap" />
            <span>Content 02</span>
          </Menu.Item>
        </Menu.SubMenu>
      );
    };

    // ### Configuration Menu
    const ConfigMenu = ({ ...props }) => {
      return (
        <Can I="access" on="manager-content">
          <Menu.Divider {...props} />
          <Menu.SubMenu {...props} title={<span>Configuration</span>} key="config">
            <Menu.Item key="config-1" tabIndex={0}>
              <Icon type="warning" />
              <span>Config 01</span>
            </Menu.Item>
            <Menu.Item key="config-2" tabIndex={0}>
              <Icon type="exclamation" />
              <span>Config 02</span>
            </Menu.Item>
          </Menu.SubMenu>
        </Can>
      );
    };

    // ### Administration Menu ###
    const AdminMenu = ({ ...props }) => {
      return (
        <Can I="access" on="admin-content">
          <Menu.Divider {...props} />
          <Menu.SubMenu
            {...props}
            title={
              // FIXME: Icon is not rendered... :-/
              <span>
                <Icon type="tools" />
                <span>Administration</span>
              </span>
            }
            // title={<span>Administration</span>}
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
        </Can>
      );
    };

    return (
      <Layout id="menu-component-layout">
        <Layout.Sider width="300px" collapsible="false" trigger={null}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['user']} defaultOpenKeys={['user', 'config', 'admin']}>
            <UserMenu />
            <ConfigMenu />
            <AdminMenu />
          </Menu>
        </Layout.Sider>
        <Layout.Content id="menu-component-content">
          <h3>Page containing a side menu</h3>
        </Layout.Content>
      </Layout>
    );
  }
}

export { MenuComponent };
