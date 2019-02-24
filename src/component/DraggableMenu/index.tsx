import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
import DragMenuItem from './DragMenuItem';

export interface DraggableMenuProps {
  selectedKeys: Array<string>;
  menuDatas: Array<any>;
  openKeys: Array<string>;
  onClick: (group: string, keyPath: Array<string>, id: string | number) => void;
  onOpenChange: (openKeys: Array<string>) => void;
  onSave?: () => void;
  shellStyleDatas: Array<any>;
  type: 'component' | 'module' | string;
}
export interface DraggableMenuState {
  currentShellStyle: any;
}

export default class DraggableMenu extends Component<
  DraggableMenuProps,
  DraggableMenuState
> {
  private menuSelectPrefix: string;
  static defaultProps = {
    selectedKeys: [],
    menuDatas: [],
    openKeys: [],
    shellStyleDatas: [],
    type: 'component',
  };

  constructor(props: DraggableMenuProps) {
    super(props);
    this.state = {
      currentShellStyle: {},
    };
    this.menuSelectPrefix = 'dragMenuItem';
  }

  handleMenuClick = ({ item, keyPath }: any) => {
    const { onClick } = this.props;

    const { item: propsItem = {} } = item.props;

    onClick &&
      onClick(
        propsItem ? propsItem.group : null,
        [keyPath[keyPath.length - 1] + propsItem.id],
        propsItem.id,
      );
  };

  handleShellStyle = (currentShellStyle: any) => {
    this.setState({ currentShellStyle });
  };

  generateSubMenu = (children: any, currentShellStyle: any) =>
    children.map((item: any, j: number) => {
      const { group, id } = item;
      const style = Object.assign({}, item, { style: currentShellStyle });

      return (
        <DragMenuItem
          key={`${this.menuSelectPrefix}${group}${id}`}
          item={style}
        />
      );
    });

  render = () => {
    const {
      type,
      // shellStyleDatas,
      menuDatas,
      openKeys,
      selectedKeys,
      onOpenChange,
      onSave,
    } = this.props;
    const { currentShellStyle } = this.state;

    const hrefToDisplay = (
      <Menu.Item key="back" onClick={() => (location.hash = '/display')}>
        <Icon type="arrow-left" theme="outlined" />
        <span>首页</span>
      </Menu.Item>
    );

    const styleSubMenu = (
      <Menu.Item key="back" onClick={() => onSave && onSave()}>
        <Icon type="arrow-left" theme="outlined" />
        <span>保存并返回</span>
      </Menu.Item>
    );

    return (
      <div className="DraggableMenu">
        <Menu
          openKeys={openKeys}
          selectedKeys={[this.menuSelectPrefix + selectedKeys[0]]}
          mode="inline"
          onOpenChange={onOpenChange}
          onClick={this.handleMenuClick}
        >
          {type == 'module' && hrefToDisplay}

          {type == 'component' && styleSubMenu}

          {menuDatas.map(item => {
            const { groupName, children = [], group } = item;

            const subMenuTitle = (
              <span>
                <Icon type="laptop" theme="outlined" />
                <span>{groupName}</span>
              </span>
            );

            return (
              <SubMenu key={group} title={subMenuTitle}>
                {this.generateSubMenu(children, currentShellStyle)}
              </SubMenu>
            );
          })}
        </Menu>
      </div>
    );
  };
}
