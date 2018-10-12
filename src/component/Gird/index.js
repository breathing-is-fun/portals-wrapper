/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-26 11:25:50
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-12 11:09:17
 */
import React, { Component } from 'react';

import { reject } from 'lodash';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import Shell from '../../component/Shell';
import PropertyBoard from '../PropertyBoard';
import Loader from './ModulesLoader';

export default class Grid extends Component {
	constructor (props) {
		super(props);

		this.state = {
			layout: [],
			isDrawerOpen: false,
			propertyBoardDataSource: {},
			currentShellStyle: {},
		};

		this.roots = [];
	}

    componentDidMount = () => {
    	this.loadLayout(() => {
    		const { layout } = this.state;
    		const loader = new Loader(layout, this.roots);

    		loader.load();
    	});
    }

	loadLayout = callback => {
		fetch('../../../mock/layoutDatas.json')
			.then(result => result.json())
			.then(result => {
				const { layout } = result;

				this.setState({ layout }, () => callback && callback());
			});
	}

    handleLayoutChange = layout => {
    	// console.log(layout);
    }

	handleDragDrop = e => {
		let { layout } = this.state;
		const item = JSON.parse(e.dataTransfer.getData('menuItemToGrid'));
		const { key, url, text, style } = item;

		layout.push({
			i: '' + key + layout.length,
			x: (layout.length * 2) % 12,
			y: Infinity,
			w: 2,
			h: 9,
			type: 'iframe',
			imgUrl: url,
			title: text,
			style
		});

		this.setState({ layout });
	}

	handleShellOnChange = layoutItem => {
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

		return <div style={{ height }} ref={ ref => this.roots.push({ [i]: ref }) } />;
	}

    render = () => {
    	const { layout, isDrawerOpen, propertyBoardDataSource, currentShellStyle } = this.state;
    	const { isEdit = true } = this.props;

    	const layoutProps = {
    		className: 'layout',
    		// draggableHandle: '.layout',
    		cols: 12,
    		rowHeight: 30,
    		width: (document.documentElement.clientWidth || document.body.clientWidth) - 256,
    		margin: [10, 10],
    		onLayoutChange: this.handleLayoutChange,
    		isDraggable: isEdit,
    		isResizable: isEdit,
    		compactType: 'horizontal',
    	};

    	const propertyBoardProps = {
    		visible: isDrawerOpen,
    		onClose: isDrawerOpen => this.setState({ isDrawerOpen }),
    		dataSource: propertyBoardDataSource,
    		onChange: currentShellStyle => {
    			this.setState({ currentShellStyle });
    		}
    	};

    	return (
    		<div className='Grid' onDrop={ this.handleDragDrop } onDragOver={ e => e.preventDefault() }>
    			<GridLayout { ...layoutProps }>
    				{
    					layout.map(item => {
    						const { i: key, title, style: shellStyle = {} } = item;

    						const shellProps = {
    							key,
    							'data-grid': item,
    							style: Object.assign({}, { zIndex: 1, userSelect: 'none' }, shellStyle, currentShellStyle),
    							title,
    							onDelete: this.handleShellOnChange,
    							onEdit: isDrawerOpen => this.setState({ isDrawerOpen, propertyBoardDataSource: item }),
    							isEdit,
    						};

    						return (
    							<Shell { ...shellProps }>
    								{ this.createShellChild(isEdit, item) }
    							</Shell>
    						);
    					})
    				}
    			</GridLayout>

    			<PropertyBoard { ...propertyBoardProps } />
    		</div>
    	);
    }
}