/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-29 10:26:03
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-01 19:52:27
 */
import React, { Component } from 'react';

// import Grid from './Grid';
import Grid from '../../component/Gird';
import DraggableMenu from '../../component/DraggableMenu';
// import Navigation from '../../component/Navigation';
import Ruler from '../../component/Ruler';
import { handleMenuGroup } from '../../component/DraggableMenu/handler';
import { reject } from 'lodash';
import { ajax } from '../../urlHelper';

import { Layout } from 'antd';
const { Sider } = Layout;

export default class ComponentEdit extends Component {
	constructor (props) {
		super(props);

		this.state = {
			layout: [],
			menuDatas: [],
			openKeys: [],
			selectedKeys: [],
			shellStyleDatas: [],
			propertyBoardEnumData: [],
		};
	}

	componentWillMount = () => {
		const { moduleToComponent } = window['_acrossDatas'];
		const { data = {} } = moduleToComponent;

		if(Object.keys(data).length == 0) {
			location.hash = '/edit/module';
		}
	}

    componentDidMount = () => {
    	this.loadMenuDatas();

    	this.loadPropertyBoardData();
    }

	loadPropertyBoardData = () => {
		ajax({
			key: 'propertyDatas',
			success: ({ data }) => this.setState({ propertyBoardEnumData: data }),
		});
	}

	loadMenuDatas = () => {
		ajax({
			key: 's_slmh_menu_data',
			data: { type: 2 },
			success: ({ data }) => {
				const menuDatas = handleMenuGroup(data);
				const { group, id } = data.length != 0 ? data[0] : {};

				this.setState({
					menuDatas,
					openKeys: [group],
					selectedKeys:  [group + id]
				}, () => this.loadLayoutDatas());
			},
		});
	}

	loadLayoutDatas = () => {
		let id = 1;

		ajax({
			key: 's_slmh_meal_layout_data',
			data: { id },
			success: ({ data }) => this.setState({ layout: data }),
		});
	}

	handleOnSave = () => {
		const { moduleToComponent } = window['_acrossDatas'];
		const { data = {} } = moduleToComponent;
		const { layout } = this.state;

		const postData = Object.assign({}, { layout }, data);

		console.log(postData);
		// location.hash = '/edit/module';

		// window['_acrossDatas'] = Object.assign({}, window['_acrossDatas'], { componentToModule: { isComponentSave: true, data: {} }, moduleToComponent: { data: {} } });
	}

	handleOnDelete = layoutItem => {
		const { i: key } = layoutItem;
		const { layout } = this.state;

		this.setState({ layout: reject(layout, { i: key }) });
	}

	handleLayoutChange = layout => this.setState({ layout })

	handleMenuClick = (group, selectedKeys, id) => {
		// this.loadLayoutDatas(group == 'all' ? 1 : id);

		this.setState({ selectedKeys });
	}

	handleOnOpenChange = openKeys => this.setState({ openKeys });

	render = () => {
		const { layout, selectedKeys, menuDatas, openKeys, shellStyleDatas, propertyBoardEnumData } = this.state;

		const draggableMenuProps = {
    		selectedKeys, menuDatas, openKeys,
    		onClick: this.handleMenuClick,
			onOpenChange: this.handleOnOpenChange,
			shellStyleDatas,
			onSave: this.handleOnSave,
		};

		const gridProps = {
			isEdit: true,
			isDelete: true,
			layout,
			onLayoutChange: this.handleLayoutChange,
			onDelete: this.handleOnDelete,
			propertyBoardEnumData,
		};

		return (
			// <Navigation type='componentEdit'>
			<Layout style={{ minHeight: '100vh' }}>
				<Sider theme='light' width='256'>
					<DraggableMenu { ...draggableMenuProps } />
				</Sider>

				<Layout style={{ position: 'relative' }}>
					<Ruler>
						<Grid { ...gridProps } />
					</Ruler>
				</Layout>
			</Layout>
			// </Navigation>
		);
	}
}