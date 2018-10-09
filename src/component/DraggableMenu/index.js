/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-28 17:29:59
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-09 11:30:09
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
		};
	}

    componentDidMount = () => {
    	this.loadMenuDatas();

    	this.loadShellStyleDatas();
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

	loadShellStyleDatas = () => {
		fetch('../../../mock/shellStyleDatas.json')
			.then(result => result.json())
			.then(result => this.setState({ shellStyleDatas: result.data }));
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

	handleShellStyle = item => {
		console.log(item);
	}

    render = () => {
    	const { menuDatas, openKeys, shellStyleDatas } = this.state;
    	const menuProps = {
    		// style: { width: 256 },
    		openKeys,
    		mode: 'inline',
    		onOpenChange: this.handleOnOpenChange
    	};

    	const styleSubTitle = (
    		<span>
    			<Icon type='retweet' theme='outlined' />
    			<span>样式选择</span>
    		</span>
    	);

    	return (
    		<div className='DraggableMenu'>
    			<Menu>
    				<SubMenu title={ styleSubTitle }>
    					{
    						shellStyleDatas.map((item, i) => {
    							const { thumbnailColor, text } = item;

    							return (
    								<Menu.Item key={ `shellStyle${ i }` } onClick={ () => this.handleShellStyle(item) }>
    									<div style={{ width: 10, height: 10, marginRight: 10, background: thumbnailColor, display: 'inline-block' }} />
    									<span style={{ userSelect: 'none' }}>{ text }</span>
    								</Menu.Item>
    							);
    						})
    					}
    				</SubMenu>
    			</Menu>

    			<Menu { ...menuProps }>
    				{
    					menuDatas.map(item => {
    						const { groupName, children, group } = item;
    						const subMenuTitle = (
    							<span>
    								<Icon type='laptop' theme='outlined' />
    								<span>{ groupName }</span>
    							</span>
    						);

    						return (
    							<SubMenu key={ group } title={ subMenuTitle }>
    								{ children.map(jtem => <DragMenuItem key={ `dragMenuItem${ jtem.key }` } item={ jtem } />) }
    							</SubMenu>
    						);
    					})
    				}
    			</Menu>
    		</div>
    	);
    }
}