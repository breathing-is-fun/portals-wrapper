/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-16 09:10:08
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-16 09:18:51
 */
import React, { Component } from 'react';

import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

export default class DepartMentMenu extends Component {
	constructor (props) {
		super(props);

		this.state = {

		};
	}

    componentDidMount = () => {
    	// this.loadMenuDatas();
    }

    loadMenuDatas = () => {
    	fetch('../../../mock/departmentDatas.json')
    		.then(result => result.json())
    		.then(result => {
    			const { data } = result;
    			const menuDatas = this.handleMenuGroup(data);

    			this.setState({ menuDatas, openKeys: menuDatas.length != 0 ? [menuDatas[0].group] : [] });
    		});
    }

    render = () => {
    	const menuProps = {
    		onClick: this.handleMenuClick,
    	};

    	return (
    		<Menu { ...menuProps }>
    			<Menu.Item key='tz'>

    			</Menu.Item>
    		</Menu>
    	);
    }
}