/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-11-07 14:31:39
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-12 14:40:12
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

		onClick && onClick([key]);
	}

    render = () => {
    	const { children, menuDatas } = this.props;
    	const { key } = this.state;

    	return (
    		<div className='LoadMenu'>
    			<Layout style={{ minHeight: '100vh' }}>
    				<Sider collapsible style={{ background: '#FFF' }}>
    					<Menu defaultSelectedKeys={ [key] } mode='inline' onClick={ this.handleMenuClick } forceSubMenuRender>
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