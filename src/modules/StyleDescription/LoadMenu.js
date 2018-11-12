/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-11-07 14:31:39
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-12 11:52:27
 */
import React, { Component } from 'react';

import { Layout, Menu, Icon } from 'antd';
const { Content, Footer, Sider } = Layout;

import './css/LoadMenu.css';

export default class LoadMenu extends Component {
	constructor (props) {
		super(props);

		this.state = {
			key: 'HomePage',
		};
	}

    componentDidMount = () => {

    }

	handleMenuClick = ({ item, key, keyPath }) => {
		const { onClick } = this.props;

		onClick && onClick(key);
	}

    render = () => {
    	const { children } = this.props;
    	const { key } = this.state;

    	return (
    		<div className='LoadMenu'>
    			<Layout style={{ minHeight: '100vh' }}>
    				<Sider collapsible style={{ background: '#FFF' }}>
    					<Menu defaultSelectedKeys={ [key] } mode='inline' onClick={ this.handleMenuClick }>
    						{
    							menuDatas.map(item => {
    								const { key, type, text } = item;

    								return (
    									<Menu.Item key={ key }>
    										<Icon type={ type } />
    										<span>{ text }</span>
    									</Menu.Item>
    								);
    							})
    						}
    					</Menu>
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

const menuDatas = [
	{
		key: 'HomePage',
		type: 'desktop',
		text: '主页'
	},
	{
		key: 'Badge',
		type: 'team',
		text: '角标'
	},
	{
		key: 'Border',
		type: 'upload',
		text: '边框'
	},
];