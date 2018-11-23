import React, { Component } from 'react';

import Grid from '../../component/Grid';
import DraggableMenu from '../../component/DraggableMenu';
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

    	window.onresize = () => {
    		this.setState({});
    	};
    }

	loadPropertyBoardData = () => {
		ajax({
			key: 'propertyDatas',
			success: ({ data }) => {
				this.setState({ propertyBoardEnumData: data });
			},
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
		const { moduleToComponent } = window['_acrossDatas'];
		const { data: { id } } = moduleToComponent;

		id && ajax({
			key: 's_slmh_meal_layout_data',
			data: { id },
			success: ({ data: result }) => {
				let layout = [];

				for(let item of result) {
					let { style } = item;

					if(typeof style == 'string') {
						item.style = JSON.parse(style);
					}

					layout.push(item);
				}

				this.setState({ layout }, () => {
					setTimeout(() => {
						this.grid.mountRoots();
					}, 0);
				});
			},
		});
	}

	handleOnSave = () => {
		const { moduleToComponent } = window['_acrossDatas'];
		const { data = {} } = moduleToComponent;
		const { layout } = this.state;

		const postData = Object.assign({}, { layout }, data);

		ajax({
			key: 'add_meal',
			method: 'POST',
			data: postData,
			success: result => {
				if(result) {
					location.hash = '/edit/module';

					const componentToModule = {
						componentToModule: {
							isComponentSave: true,
							data: {}
						},
						moduleToComponent: {
							data: {}
						}
					};

					window['_acrossDatas'] = Object.assign(
						{},
						window['_acrossDatas'],
						componentToModule);
				} else {
					console.error(result);
				}
			}
		});
	}

	handleOnDelete = layoutItem => {
		const { i: key } = layoutItem;
		const { layout } = this.state;

		this.setState({ layout: reject(layout, { i: key }) });
	}

	handleLayoutChange = layout => {
		this.setState({ layout });
	}

	handleMenuClick = (group, selectedKeys, id) => {
		this.setState({ selectedKeys });
	}

	handleOnOpenChange = openKeys => this.setState({ openKeys });

	render = () => {
		const {
			layout,
			selectedKeys,
			menuDatas,
			openKeys,
			shellStyleDatas,
			propertyBoardEnumData
		} = this.state;

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
			ref: ref => ref && (this.grid = ref),
		};

		return (
			// <Navigation type='componentEdit'>
			<Layout
				style={{
					minHeight: '100vh',
					height: document.body.clientHeight
				}}
			>
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