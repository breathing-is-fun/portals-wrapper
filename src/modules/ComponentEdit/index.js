/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-29 10:26:03
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-29 10:01:01
 */
import React, { Component } from 'react';

// import Grid from './Grid';
import Grid from '../../component/Gird';
import DraggableMenu from '../../component/DraggableMenu';
// import Navigation from '../../component/Navigation';
import Ruler from '../../component/Ruler';
import { handleMenuGroup } from '../../component/DraggableMenu/handler';
import { reject } from 'lodash';

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
		};
	}

    componentDidMount = () => {
    	this.loadMenuDatas();

    	this.loadShellStyleDatas();
    }

	loadMenuDatas = () => {
		fetch('../../../mock/menuDatas.json')
			.then(result => result.json())
			.then(result => {
				const { data } = result;
				const menuDatas = handleMenuGroup(data);
				const checkKey = menuDatas.length != 0 ? [menuDatas[0].group] : [];

				this.setState({
					menuDatas,
					openKeys: checkKey,
					selectedKeys: [checkKey[0]]
				}, () => this.loadLayout(checkKey));
			});
	}

	loadShellStyleDatas = () => {
		fetch('../../../mock/shellStyleDatas.json')
			.then(result => result.json())
			.then(result => {
				if(result.data.length != 0)
					this.setState({ shellStyleDatas: result.data, currentShellStyle: result.data[0].style });
			});
	}

	loadLayout = () => {
		fetch('../../../mock/layoutDatas.json')
			.then(result => result.json())
			.then(result => {
				const { layout } = result;

				this.setState({ layout });
			});
	}

	handleOnSave = () => {
		console.log(this.state.layout);
		location.hash = '/edit/module';

		window['_acrossDatas'] = Object.assign({}, window['_acrossDatas'], { componentToModule: { isComponentSave: true, data: {} }, moduleToComponent: { data: {} } });
	}

	handleOnDelete = layoutItem => {
		const { i: key } = layoutItem;
		const { layout } = this.state;

		this.setState({ layout: reject(layout, { i: key }) });
	}

	render = () => {
		const { layout, selectedKeys, menuDatas, openKeys, shellStyleDatas } = this.state;

		const draggableMenuProps = {
    		selectedKeys, menuDatas, openKeys,
    		onClick: this.handleMenuClick,
			onOpenChange: this.handleOnOpenChange,
			shellStyleDatas,
			onSave: this.handleOnSave,
    	};

		return (
			// <Navigation type='componentEdit'>
			<Layout style={{ minHeight: '100vh' }}>
				<Sider theme='light' width='256'>
					<DraggableMenu { ...draggableMenuProps } />
				</Sider>

				<Layout style={{ position: 'relative' }}>
					<Ruler>
						<Grid isEdit={ true } isDelete={ true } layout={ layout } onDelete={ this.handleOnDelete } />
					</Ruler>
				</Layout>
			</Layout>
			// </Navigation>
		);
	}
}