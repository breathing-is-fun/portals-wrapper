/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-29 14:08:08
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-29 14:26:24
 */
import React, { Component } from 'react';

import { Menu } from 'antd';

export default class DragMenuItem extends Component {
    render = () => {
    	const { draggable = true, text, key, url } = this.props.item;
    	const propsParam = {
    		key: `menuItem${ key }`,
    		draggable,
    		onDragStart: e => console.log(e)
    	};

    	return <Menu.Item { ...Object.assign({}, this.props, propsParam) }>{ text }</Menu.Item>;
    }
}