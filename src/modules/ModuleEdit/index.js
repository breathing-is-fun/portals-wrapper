/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-15 17:20:47
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-19 09:41:59
 */
import React, { Component } from 'react';

import DraggableMenu from '../../component/DraggableMenu';
import Navigation from '../../component/Navigation';
import ModuleLayout from './ModuleLayout';

import { Layout } from 'antd';
const { Sider } = Layout;

export default class ModuleEdit extends Component {
	constructor (props) {
		super(props);

		this.state = {
			layout: [],
		};
	}

	componentDidMount = () => {

	}

	handleMenuClick = (key) => this.loadLayoutDatas(key)

	loadLayoutDatas = key => {
		let url = `../../../mock/department/${ key }.json`;

		url += key ? `?depart=${ key }` : '';
		fetch(url)
			.then(result => result.json())
			.then(result => this.setState({ layout: result.data }));
	}

    render = () => {
    	const { layout } = this.state;

    	return (
    		// <Navigation type='moduleEdit'>
    			<Layout style={{ minHeight: '100vh' }}>
    				<Sider theme='light' width='256'>
    					<DraggableMenu type='module' onClick={ this.handleMenuClick } onLoad={ param => this.loadLayoutDatas(param) } />
    				</Sider>

    				<Layout>
    					<ModuleLayout layout={ layout } onDelete={ layout => this.setState({ layout }) } />
    				</Layout>
    			</Layout>
    		// </Navigation>
    	);
    }
}