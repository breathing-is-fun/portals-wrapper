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
    	const itemProps = Object.assign({}, this.props, propsParam);

    	return <Menu.Item { ...itemProps }>{ text }</Menu.Item>;
    }
}