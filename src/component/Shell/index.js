/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-08 10:39:22
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-10 16:44:51
 */
import React, { Component } from 'react';

import { Icon } from 'antd';
import PropertyBoard from './PropertyBoard';

import './css/Shell.css';

export default class Shell extends Component {
	constructor (props) {
		super(props);
		const { title } = props;

		this.state = {
			title,
			propertyBoardVisible: false,
			propertyBoardDataSource: {}
		};
	}

    componentDidMount = () => {

    }

	handleOnChange = e => {
		const { onChange } = this.props;
		const dataGrid = this.props['data-grid'] || {};

		this.preventBubble(e);

		onChange && onChange(dataGrid);
	}

	handleOnEdit = e => {
		const { style } = this.props;
		const dataGrid = this.props['data-grid'] || {};

		this.preventBubble(e);

		this.setState({
			propertyBoardVisible: true,
			propertyBoardDataSource: { title: dataGrid.title || '', style },
		});
	}

	// 阻止react-grid-layout的拖拽事件在点击时生效
	preventBubble = e => {
		if(e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	}

	handleDrawerOnClose = propertyBoardVisible => {
		const { onDrawerOpen } = this.props;

		onDrawerOpen && onDrawerOpen(propertyBoardVisible);

		this.setState({ propertyBoardVisible });
	}

    render = () => {
    	const { children } = this.props;
    	const { title, propertyBoardVisible, propertyBoardDataSource } = this.state;

    	const operateBoard = (
    		<div style={{ background: '#ccc', height: 30 }}>
    			<Icon type='delete' theme='outlined' className='operation' onMouseDown={ this.handleOnChange } />
    			<Icon type='edit' theme='outlined' className='operation' onMouseDown={ this.handleOnEdit } />
    			<span>{ title }</span>
    		</div>
    	);

    	const propertyBoardProps = {
    		visible: propertyBoardVisible,
    		onClose: this.handleDrawerOnClose,
    		dataSource: propertyBoardDataSource,
    	};

    	return (
    		<div { ...this.props } className='Shell'>
    			{ operateBoard }

    			{ children }

    			<PropertyBoard { ...propertyBoardProps } />
    		</div>
    	);
    }
}