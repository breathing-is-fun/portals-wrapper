/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-28 17:29:59
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-29 11:26:32
 */
import React, { Component } from 'react';

import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

export default class DraggableMenu extends Component {
	constructor (props) {
		super(props);

		this.state = {
			menuDatas: []
		};
	}

    componentDidMount = () => {
    	this.loadMenuDatas();
    }

	loadMenuDatas = () => {
		fetch('../../../mock/menuDatas.json')
			.then(result => result.json())
			.then(result => {
				const { data } = result;

				this.setState({ menuDatas: this.handleMenuGroup(data) });
			});
	}

	handleMenuGroup = dataSource => {
		let result = [], groupDatas = [], tempGroupDatas = [];

		// 分出有哪几组及组别名称
		for(let item of dataSource) {
			const { group, groupName } = item;

			tempGroupDatas.push(JSON.stringify({ group, groupName }));
		}
		tempGroupDatas = Array.from(new Set(tempGroupDatas));

		for(let item of tempGroupDatas) {
			groupDatas.push(JSON.parse(item));
		}

		// 凑菜单数据结构，[{ groupName: '', children: [{ text: '', url: '' }] }]
		for(let item of groupDatas) {
			const { group, groupName } = item;

			let childResult = { groupName, group, children: [] };

			for(let jtem of dataSource) {
				const { group: groupChild } = jtem;
				const { children } = childResult;

				if(groupChild == group) {
					children.push(jtem);
				}
			}
			result.push(childResult);
		}

		console.log(result);
		return result;
	}

    render = () => {
    	const { menuDatas } = this.state;
    	const menuProps = {
    		onClick: this.handleMenuClick,
    		style: { width: 256 },
    		defaultSelectedKeys: menuDatas.length != 0 ? [menuDatas[0].group] : [],
    		defaultOpenKeys: menuDatas.length != 0 ? [menuDatas[0].group] : [],
    		mode: 'inline'
    	};

    	return (
    		<div className='Menu'>
    			<Menu { ...menuProps }>
    				{
    					menuDatas.map((item, i) => {
    						const { groupName, children, group } = item;

    						return (
    							<SubMenu key={ `subMenu${ i }` } title={ <span><Icon type='laptop' theme='outlined' /><span>{ groupName }</span></span> }>
    								{
    									children.map((jtem, j) => {
    										const { draggable, text, url } = jtem;

    										return (
    											<Menu.Item key={ `menuItem${ j }` } draggable={ draggable }>{ text }</Menu.Item>
    										);
    									})
    								}
    							</SubMenu>
    						);
    					})
    				}
    			</Menu>
    		</div>
    	);
    }
}