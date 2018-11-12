/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-11-07 14:31:39
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-12 16:55:04
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

    render = () => {
    	const { children, menuDatas, selectedKey } = this.props;

    	const menu = (
    		<Menu selectedKeys={ [selectedKey] } mode='inline' forceSubMenuRender>
    			{
    				menuDatas.map(item => {
    					const { key, type, text, children = [] } = item;

    					if(type == 'item') {
    						return (
    							<Menu.Item key={ key } onClick={ () => this.handleMenuClick(item, key) }>
    								<span>{ text }</span>
    							</Menu.Item>
    						);
    					}

    					return (
    						<SubMenu key={ key } title={ <span>{ text }</span> }>
    							{
    								children.map((jtem, j) => {
    									const { key: jtemKey, title: childTitle, text: childText } = jtem;

    									return (
    										<ItemGroup key={ jtemKey } title={ childTitle }>
    											<Menu.Item key={ jtemKey + j } onClick={ () => this.handleMenuClick(jtem, jtemKey) }>{ childText }</Menu.Item>
    										</ItemGroup>
    									);
    								})
    							}
						  	</SubMenu>
    					);
    				})
    			}
    		</Menu>
    	);

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
    						<div>Poverty makes us meet, but later, only you come out of the closet...</div>
    					</Footer>
    				</Layout>
    			</Layout>
    		</div>
    	);
    }
}