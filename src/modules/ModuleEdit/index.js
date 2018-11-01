/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-15 17:20:47
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-01 18:14:04
 */
import React, { Component } from 'react';

import DraggableMenu from '../../component/DraggableMenu';
// import Navigation from '../../component/Navigation';
import ModuleLayout from './ModuleLayout';
import { handleMenuGroup } from '../../component/DraggableMenu/handler';

import { Layout } from 'antd';
const { Sider } = Layout;

export default class ModuleEdit extends Component {
	constructor (props) {
		super(props);

		this.state = {
			layout: [],
			menuDatas: [],
			openKeys: [],
			selectedKeys: [],
			isAll: true, // true时，Shell才会显示编辑和删除
		};
	}

	componentDidMount = () => {
		this.loadMenuDatas();
	}

	handleMenuClick = (group, selectedKeys, id) => {
		this.loadLayoutDatas(group == 'all' ? 1 : id);

		this.setState({ selectedKeys, isAll: group == 'all' });
	}

	handleOnOpenChange = openKeys => this.setState({ openKeys });

	loadLayoutDatas = id => {
		fetch(`http://47.95.1.229:9003/webapi/api/v1.1/basic/data?key=slmh_meal_switch&id=${ id }`)
			.then(result => result.json())
			.then(({ data }) => this.setState({ layout: data }));
	}

	loadMenuDatas = () => {
		fetch('http://47.95.1.229:9003/webapi/api/v1.1/basic/data?key=slmh_menu_data&type=1')
			.then(result => result.json())
			.then(({ data }) => {
				const menuDatas = handleMenuGroup(data);
				const { group, id } = data.length != 0 ? data[0] : {};

				this.setState({
					menuDatas,
					openKeys: [group],
					selectedKeys:  [group + id]
				}, () => this.loadLayoutDatas(1));
			});
	}

	handleMealOnDelete = (layout, id) => {
		const params = {
			method: 'GET',
			body: JSON.stringify({ id }),
			headers: { 'Content-Type': 'application/json' },
		};

		fetch(`http://47.95.1.229:9003/webapi/api/v1.1/basic/data?key=slmh_meal_delete&id=${ id }`)
			.then(result => result.json())
			.then(result => {
				console.log(result);
				// this.setState({ layout });
				this.loadLayoutDatas(1);
			});
	}

    render = () => {
    	const { layout, menuDatas, openKeys, selectedKeys, isAll } = this.state;

    	const draggableMenuProps = {
    		selectedKeys, menuDatas, openKeys,
    		type: 'module',
    		onClick: this.handleMenuClick,
    		onOpenChange: this.handleOnOpenChange,
    	};

    	return (
    		// <Navigation type='moduleEdit'>
    			<Layout style={{ minHeight: '100vh' }}>
    				<Sider theme='light' width='256'>
    					<DraggableMenu { ...draggableMenuProps } />
    				</Sider>

    				<Layout>
    					<ModuleLayout layout={ layout } onDelete={ this.handleMealOnDelete } isAll={ isAll } />
    				</Layout>
    			</Layout>
    		// </Navigation>
    	);
    }
}