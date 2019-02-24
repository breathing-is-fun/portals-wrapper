import React, { Component } from 'react';
import { Menu } from 'antd';

export interface DragMenuItemProps {
  item?: any;
}
export interface DragMenuItemState {}
export default class DragMenuItem extends Component<
  DragMenuItemProps,
  DragMenuItemState
> {
  handleDragStart = (event: any, item: any) => {
    event.dataTransfer.setData('menuItemToGrid', JSON.stringify(item));
  };

  render = () => {
    const { item } = this.props;
    const { draggable = true, text, id, group } = item;
    const propsParam = {
      key: group + id,
      draggable,
      onDragStart: (e: any) => this.handleDragStart(e, item),
    };
    const itemProps = Object.assign({}, this.props, propsParam);

    return <Menu.Item {...itemProps}>{text}</Menu.Item>;
  };
}
