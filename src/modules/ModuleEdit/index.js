import React, { Component } from 'react';

import DraggableMenu from '../../component/DraggableMenu';
// import Navigation from '../../component/Navigation';
import ModuleLayout from './ModuleLayout';
import { handleMenuGroup } from '../../component/DraggableMenu/handler';
import { ajax } from '../../urlHelper';

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
		ajax({
			key: 's_slmh_meal_switch',
			data: { id },
			success: ({ data }) => this.setState({ layout: data }),
		});
	}

	loadMenuDatas = () => {
		ajax({
			key: 's_slmh_menu_data',
			data: { type: 1 },
			success: ({ data }) => {
				const menuDatas = handleMenuGroup(data);
				const { group, id } = data.length != 0 ? data[0] : {};

				this.setState({
					menuDatas,
					openKeys: [group],
					selectedKeys:  [group + id]
				}, () => this.loadLayoutDatas(1));
			},
		});
	}

	handleMealOnDelete = (layout, id) => {
		ajax({
			key: 'd_slmh_meal',
			data: { id },
			success: ({ data }) => {
				// this.setState({ layout });
				this.loadLayoutDatas(1);
			},
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
    					<ModuleLayout
    					layout={ layout }
    					onDelete={ this.handleMealOnDelete }
    					isAll={ isAll }
    				/>
    				</Layout>
    			</Layout>
    		// </Navigation>
    	);
    }
}