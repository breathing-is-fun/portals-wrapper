/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-28 17:29:59
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-16 10:10:36
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
			shellStyleDatas: [],
			currentShellStyle: {},
		};
	}

    componentDidMount = () => {
    	this.loadMenuDatas();

    	this.loadShellStyleDatas();
    }

	loadMenuDatas = () => {
		const { type = 'component' } = this.props;

		fetch(`../../../mock/${ type == 'component' ? 'menuDatas' : 'departmentDatas' }.json`)
			.then(result => result.json())
			.then(result => {
				const { data } = result;
				const menuDatas = this.handleMenuGroup(data);
				const checkKey = menuDatas.length != 0 ? [menuDatas[0].group] : [];

				this.setState({ menuDatas, openKeys: checkKey, selectedKeys: ['dragMenuItem' + checkKey[0]] });
			});
	}

	loadShellStyleDatas = () => {
		fetch('../../../mock/shellStyleDatas.json')
			.then(result => result.json())
			.then(result => {
				if(result.data.length != 0)
					this.setState({ shellStyleDatas: result.data, currentShellStyle: result.data[0].style });
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

			// if(childResult.children && childResult.children.length == 1) {
			// 	delete childResult.children;
			// }

			result.push(childResult);
		}

		return result;
	}

	handleMenuClick = ({ item, key, keyPath }) => {
		const { onClick } = this.props;

		onClick && onClick(item, key, keyPath);

		this.setState({ selectedKeys: [key] });
	}

	handleOnOpenChange = openKeys => this.setState({ openKeys });

	handleShellStyle = currentShellStyle => this.setState({ currentShellStyle });

    render = () => {
    	const { type = 'component' } = this.props;
    	const { menuDatas, openKeys, shellStyleDatas, currentShellStyle, selectedKeys } = this.state;

    	const menuProps = {
    		// style: { width: 256 },
    		openKeys, selectedKeys,
    		mode: 'inline',
    		onOpenChange: this.handleOnOpenChange,
    		onClick: this.handleMenuClick,
    	};

    	const styleSubTitle = (
    		<span>
    			<Icon type='retweet' theme='outlined' />
    			<span>样式选择</span>
    		</span>
    	);

    	const styleSubMenu = (
    		<Menu>
    			<SubMenu title={ styleSubTitle }>
    				{
    					shellStyleDatas.map((item, i) => {
    						const { thumbnailColor, text, style } = item;

    						return (
    							<Menu.Item key={ `shellStyle${ i }` } onClick={ () => this.handleShellStyle(style) }>
    								<div style={{ width: 10, height: 10, marginRight: 10, background: thumbnailColor, display: 'inline-block' }} />
    								<span style={{ userSelect: 'none' }}>{ text }</span>
    							</Menu.Item>
    						);
    					})
    				}
    			</SubMenu>
    		</Menu>
    	);

    	return (
    		<div className='DraggableMenu'>
    			{ type == 'component' && styleSubMenu }

    			<Menu { ...menuProps }>
    				{
    					menuDatas.map(item => {
    						const { groupName, children = [], group } = item;

    						const subMenuTitle = (
    							<span>
    								<Icon type='laptop' theme='outlined' />
    								<span>{ groupName }</span>
    							</span>
    						);

    						return (
    							<SubMenu key={ group } title={ subMenuTitle }>
    								{ children.map(jtem => <DragMenuItem key={ `dragMenuItem${ jtem.key }` } item={ Object.assign({}, jtem, { style: currentShellStyle }) } />) }
    							</SubMenu>
    						);
    					})
    				}
    			</Menu>
    		</div>
    	);
    }
}