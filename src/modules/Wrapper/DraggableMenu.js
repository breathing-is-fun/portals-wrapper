/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-28 17:29:59
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-29 14:24:30
 */
import React, { Component } from 'react';

import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

import DragMenuItem from './DragMenuItem';

export default class DraggableMenu extends Component {
	constructor (props) {
		super(props);

		this.state = {
			menuDatas: [],
			openKeys: [],
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
				const menuDatas = this.handleMenuGroup(data);

				this.setState({ menuDatas, openKeys: menuDatas.length != 0 ? [menuDatas[0].group] : [] });
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

		return result;
	}

	handleOnOpenChange = openKeys => this.setState({ openKeys });

    render = () => {
    	const { menuDatas, openKeys } = this.state;
    	const menuProps = {
    		// onClick: this.handleMenuClick,
    		style: { width: 256 },
    		openKeys,
    		mode: 'inline',
    		onOpenChange: this.handleOnOpenChange
    	};

    	return (
    		<div className='Menu'>
    			<Menu { ...menuProps } ref={ ref => this.menuIns = ref }>
    				{
    					menuDatas.map(item => {
    						const { groupName, children, group } = item;

    						return (
    							<SubMenu key={ group } title={ <span><Icon type='laptop' theme='outlined' /><span>{ groupName }</span></span> }>
    								{
    									children.map(jtem => {
    										// const { key } = jtem;
    										const { draggable = true, text, key, url } = jtem;

    										return <DragMenuItem key={ `dragMenuItem${ key }` } item={ jtem } />;
    										// return <Menu.Item key={ `menuItem${ key }` } draggable={ draggable } onDragStart={ e => console.log(e) }>{ text }</Menu.Item>;
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