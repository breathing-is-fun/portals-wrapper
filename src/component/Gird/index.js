/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-26 11:25:50
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-23 18:40:56
 */
import React, { Component } from 'react';

import { reject } from 'lodash';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import Shell from '../../component/Shell';
import Loader from './ModulesLoader';

export default class Grid extends Component {
	constructor (props) {
		super(props);

		this.state = {
			isDrawerOpen: false,
			propertyBoardDataSource: {},
			currentShellStyle: {},
			PropertyBoard: null,
		};

		this.roots = {};
	}

    componentDidMount = () => {

    }

	mountRoots = () => {
		const { layout } = this.props;

    	const loader = new Loader(layout, this.roots);

    	loader.load();
	}

    handleLayoutChange = layout => {
    	console.log(layout);
    }

	handleDragDrop = e => {
		let { layout } = this.props;
		const item = JSON.parse(e.dataTransfer.getData('menuItemToGrid'));
		const { key, url, text, style } = item;

		layout.push({
			i: '' + key + layout.length,
			x: (layout.length * 2) % 12,
			y: Infinity, w: 2, h: 9,
			type: 'iframe',
			imgUrl: url,
			title: text,
			style
		});

		this.setState({});
	}

	handleShellOnDelete = layoutItem => {
		const { i: key } = layoutItem;
		const { layout } = this.state;

		this.setState({ layout: reject(layout, { i: key }) });
	}

	createShellChild = (isEdit, item) => {
		const { i, type, imgUrl, path } = item;
		const height = 'calc(100% - 30px)';

		if(type == 'iframe') {
			if(isEdit) {
				return <img src={ imgUrl } style={{ width: '100%', height }} />;
			}

			return <iframe src={ path } style={{ border: 'none', width: '100%', height, overflow: 'auto' }}></iframe>;
		}

		return <div style={{ height }} ref={ ref => ref && (this.roots[i] = ref) } />;
	}

	handleShellonEdit = (isDrawerOpen, item) => import('../PropertyBoard')
		.then(PropertyBoard => this.setState({ isDrawerOpen, propertyBoardDataSource: item, PropertyBoard: PropertyBoard.default }))

    render = () => {
    	const { isDrawerOpen, propertyBoardDataSource, currentShellStyle, PropertyBoard } = this.state;
    	const { isEdit = true, isDelete = true, layout } = this.props;

    	const layoutProps = {
    		className: 'layout',
    		cols: 12,
    		rowHeight: 30,
    		width: (document.documentElement.clientWidth || document.body.clientWidth) - (isEdit ? 256 : 0),
    		margin: [10, 10],
    		onLayoutChange: this.handleLayoutChange,
    		isDraggable: isEdit,
    		isResizable: isEdit,
    		// compactType: 'horizontal',
    		style: { height: '100%', background: '#f5f6fa' },
    	};

    	const propertyBoardProps = {
    		visible: isDrawerOpen,
    		onClose: isDrawerOpen => {
    			this.setState({ isDrawerOpen }, () => {
    				// 关闭抽屉时销毁外壳中的元素，好在再次点击时执行componentDidMount中的方法
    				setTimeout(() => this.setState({ PropertyBoard: null }), 301);
    			});
    		},
    		dataSource: propertyBoardDataSource,
    		onChange: currentShellStyle => this.setState({ currentShellStyle }),
    	};

    	layout.length != 0 && this.mountRoots();

    	return (
    		<div className='Grid' onDrop={ this.handleDragDrop } onDragOver={ e => e.preventDefault() }>
    			<GridLayout { ...layoutProps }>
    				{
    					layout.map(item => {
    						const { i: key, title, style: shellStyle = {} } = item;

    						const shellProps = {
    							key, title, isEdit, isDelete,
    							'data-grid': item,
    							style: Object.assign({}, { zIndex: 1, userSelect: 'none' }, { boxShadow: '0px 0px 29px 0px rgba(93, 106, 113, 0.12)', borderRadius: 2 }, shellStyle, currentShellStyle),
    							onDelete: this.handleShellOnDelete,
    							onEdit: isDrawerOpen => this.handleShellonEdit(isDrawerOpen, item),
    						};

    						return (
    							<Shell { ...shellProps }>
    								{ this.createShellChild(isEdit, item) }
    							</Shell>
    						);
    					})
    				}
    			</GridLayout>

    			{ PropertyBoard && <PropertyBoard { ...propertyBoardProps } /> }
    		</div>
    	);
    }
}