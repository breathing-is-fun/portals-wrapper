/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-11-07 14:31:39
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-12 17:12:00
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

    	// 日了，这里看上去真是爆炸，得写递归
    	const menu = (
    		<Menu selectedKeys={ [selectedKey] } mode='inline' forceSubMenuRender>
    			{
    				menuDatas.map(item => {
    					const { key: itemKey, type, text: itemText, children: itemChildren = [] } = item;

    					if(type == 'item') {
    						return (
    							<Menu.Item key={ itemKey } onClick={ () => this.handleMenuClick(item, itemKey) }>
    								<span>{ itemText }</span>
    							</Menu.Item>
    						);
    					}

    					return (
    						<SubMenu key={ itemKey } title={ <span>{ itemText }</span> }>
    							{
    								itemChildren.map(jtem => {
    									const { key: jtemKey, text: jtemTitle, children: jtemChildren } = jtem;

    									return (
    										<ItemGroup key={ jtemKey } title={ jtemTitle }>
    											{
    												jtemChildren.map(ktem => {
    													const { key: ktemKey, text: ketmText } = ktem;

    													return <Menu.Item key={ ktemKey } onClick={ () => this.handleMenuClick(ktem, ktemKey) }>{ ketmText }</Menu.Item>;
    												})
    											}
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