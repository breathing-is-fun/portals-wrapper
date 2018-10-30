/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-29 14:08:08
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-30 20:42:57
 */
import React, { Component } from 'react';

import { Menu } from 'antd';

export default class DragMenuItem extends Component {
    handleDragStart = (event, item) => {
    	event.dataTransfer.setData('menuItemToGrid', JSON.stringify(item));
    }

    render = () => {
    	const { item } = this.props;
    	const { draggable = true, text, id, group } = item;
    	const propsParam = {
    		key: group + id,
    		draggable,
    		onDragStart: e => this.handleDragStart(e, item),
    	};

    	return <Menu.Item { ...Object.assign({}, this.props, propsParam) }>{ text }</Menu.Item>;
    }
}