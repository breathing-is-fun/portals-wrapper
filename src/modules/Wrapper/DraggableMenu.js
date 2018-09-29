/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-28 17:29:59
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-29 10:27:49
 */
import React, { Component } from 'react';

import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

export default class DraggableMenu extends Component {
	constructor (props) {
		super(props);

		this.state = {

		};
	}

    componentDidMount = () => {

    }

    render = () => {
    	const menuProps = {
    		onClick: this.handleMenuClick,
    		style: { width: 256 },
    		defaultSelectedKeys: ['1'],
    		defaultOpenKeys: ['sub1'],
    		mode: 'inline'
    	};

    	return (
    		<div className='Menu'>
    			<Menu { ...menuProps }>
    				<SubMenu key='sub1' title={<span><Icon type='mail' /><span>Navigation One</span></span>}>
    					<Menu.Item key='1' draggable>Option 1</Menu.Item>
    					<Menu.Item key='2'>Option 2</Menu.Item>
    					<Menu.Item key='3'>Option 3</Menu.Item>
    					<Menu.Item key='4'>Option 4</Menu.Item>
    				</SubMenu>
    				<SubMenu key='sub2' title={<span><Icon type='appstore' /><span>Navigation Two</span></span>}>
    					<Menu.Item key='5'>Option 5</Menu.Item>
    					<Menu.Item key='6'>Option 6</Menu.Item>
    				</SubMenu>
    				<SubMenu key='sub4' title={<span><Icon type='setting' /><span>Navigation Three</span></span>}>
    					<Menu.Item key='9'>Option 9</Menu.Item>
    					<Menu.Item key='10'>Option 10</Menu.Item>
    					<Menu.Item key='11'>Option 11</Menu.Item>
    					<Menu.Item key='12'>Option 12</Menu.Item>
    				</SubMenu>
    			</Menu>
    		</div>
    	);
    }
}