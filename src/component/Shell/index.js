/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-08 10:39:22
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-10 11:00:08
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

		onChange && onChange(dataGrid);
	}

	handleOnEdit = e => {
		const { style } = this.props;
		const dataGrid = this.props['data-grid'] || {};

		this.setState({
			propertyBoardVisible: true,
			propertyBoardDataSource: { title: dataGrid.title || '', style },
		});
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
    		onClose: propertyBoardVisible => this.setState({ propertyBoardVisible }),
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