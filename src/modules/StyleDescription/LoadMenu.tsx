import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
const { Content, Footer, Sider } = Layout;
const { SubMenu, ItemGroup } = Menu;
import './css/LoadMenu.css';

export interface LoadMenuProps {
  onClick: any;
  children: any;
  menuDatas: Array<any>;
  selectedKey: any;
}

export default class LoadMenu extends Component<LoadMenuProps> {
  handleMenuClick = (item: any, selectedKey: any) => {
    const { onClick } = this.props;

    onClick && onClick(item, selectedKey);
  };

  generateItemGroups = (children: any) =>
    children.map((ktem: any) => {
      const { key: ktemKey, text: ketmText } = ktem;

      return (
        <Menu.Item
          key={ktemKey}
          onClick={() => this.handleMenuClick(ktem, ktemKey)}
        >
          {ketmText}
        </Menu.Item>
      );
    });

  generateSubMenu = (children: any) =>
    children.map((jtem: any) => {
      const { key, text, children } = jtem;

      return (
        <ItemGroup key={key} title={text}>
          {this.generateItemGroups(children)}
        </ItemGroup>
      );
    });

  generateMenuItems = (menuDatas: any) =>
    menuDatas.map((item: any) => {
      const { key, type, text, children = [] } = item;

      if (type == 'item') {
        const menuItem = (
          <Menu.Item key={key} onClick={() => this.handleMenuClick(item, key)}>
            <span>{text}</span>
          </Menu.Item>
        );

        return menuItem;
      }

      return (
        <SubMenu key={key} title={<span>{text}</span>}>
          {this.generateSubMenu(children)}
        </SubMenu>
      );
    });

  render = () => {
    const { children, menuDatas, selectedKey } = this.props;

    const menu = (
      <Menu selectedKeys={[selectedKey]} mode="inline" forceSubMenuRender>
        {this.generateMenuItems(menuDatas)}
      </Menu>
    );

    const footerText =
      'Poverty makes us meet,' +
      'but later, only you come out of the closet...';

    return (
      <div className="LoadMenu">
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible style={{ background: '#FFF' }}>
            {menu}
          </Sider>

          <Layout>
            <Content style={{ margin: 16 }}>{children}</Content>

            <Footer style={{ textAlign: 'center' }}>
              <div>贫穷使我们相遇</div>
              <div>{footerText}</div>
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  };
}
