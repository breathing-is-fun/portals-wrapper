/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-11-07 14:31:39
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-21 16:07:26
 */
import React, { Component } from 'react';

import { Layout, Menu } from 'antd';
const { Content, Footer, Sider } = Layout;
const { SubMenu, ItemGroup } = Menu;

import './css/LoadMenu.css';

export default class LoadMenu extends Component {
	handleMenuClick = (item, selectedKey) => {
		const { onClick } = this.props;

		onClick && onClick(item, selectedKey);
	}

	generateItemGroups = children => (
		children.map(ktem => {
			const { key: ktemKey, text: ketmText } = ktem;

			return (
				<Menu.Item
					key={ ktemKey }
					onClick={ () => this.handleMenuClick(ktem, ktemKey) }
				>
					{ ketmText }
				</Menu.Item>
			);
		})
	)

	generateSubMenu = children => (
		children.map(jtem => {
			const {
				key,
				text,
				children
			} = jtem;

			return (
				<ItemGroup key={ key } title={ text }>
					{ this.generateItemGroups(children) }
				</ItemGroup>
			);
		})
	)

	generateMenuItems = menuDatas => (
		menuDatas.map(item => {
			const {
				key,
				type,
				text,
				children = [],
			} = item;

			if(type == 'item') {
				const menuItem = (
					<Menu.Item
						key={ key }
						onClick={ () => this.handleMenuClick(item, key) }
					>
						<span>{ text }</span>
					</Menu.Item>
				);

				return menuItem;
			}

			return (
				<SubMenu key={ key } title={ <span>{ text }</span> }>
					{ this.generateSubMenu(children) }
				</SubMenu>
			);
		})
	)

    render = () => {
    	const { children, menuDatas, selectedKey } = this.props;

    	const menu = (
    		<Menu
    			selectedKeys={ [selectedKey] }
    			mode='inline'
    			forceSubMenuRender
    		>
    			{ this.generateMenuItems(menuDatas) }
    		</Menu>
    	);

    	const footerText =
			'Poverty makes us meet,' +
			'but later, only you come out of the closet...';

    	return (
    		<div className='LoadMenu'>
    			<Layout style={{ minHeight: '100vh' }}>
    				<Sider collapsible style={{ background: '#FFF' }}>
    					{ menu }
    				</Sider>

    				<Layout>
    					<Content style={{ margin: 16 }}>
    						{ children }
    					</Content>

    					<Footer style={{ textAlign: 'center' }}>
    						<div>贫穷使我们相遇</div>
    						<div>{ footerText }</div>
    					</Footer>
    				</Layout>
    			</Layout>
    		</div>
    	);
    }
}