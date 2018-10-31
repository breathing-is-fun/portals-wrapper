/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-15 17:20:47
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-31 10:30:54
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
		};
	}

	componentDidMount = () => {
		this.loadMenuDatas();
	}

	handleMenuClick = (group, selectedKeys) => {
		this.loadLayoutDatas(group == 'all' ? '' : group);

		this.setState({ selectedKeys });
	}

	handleOnOpenChange = openKeys => this.setState({ openKeys });

	loadLayoutDatas = group => {
		fetch(`http://47.95.1.229:9003/webapi/api/v1.1/basic/data?key=slmh_meal_switch&group=${ group }`)
			.then(result => result.json())
			.then(({ data }) => this.setState({ layout: data }));
	}

	loadMenuDatas = () => {
		fetch('http://47.95.1.229:9003/webapi/api/v1.1/basic/data?key=slmh_menu_data&type=1')
			.then(result => result.json())
			.then(result => {
				const { data } = result;

				const menuDatas = handleMenuGroup(data);
				const { group, id } = data.length != 0 ? data[0] : {};

				this.setState({
					menuDatas,
					openKeys: [group],
					selectedKeys:  [group + id]
				}, () => this.loadLayoutDatas(''));
			});
	}

    render = () => {
    	const { layout, menuDatas, openKeys, selectedKeys } = this.state;

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
    					<ModuleLayout layout={ layout } onDelete={ layout => this.setState({ layout }) } />
    				</Layout>
    			</Layout>
    		// </Navigation>
    	);
    }
}