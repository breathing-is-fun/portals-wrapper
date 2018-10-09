/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-08 10:39:22
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-09 20:47:59
 */
import React, { Component } from 'react';

import { Icon } from 'antd';

export default class Shell extends Component {
	constructor (props) {
		super(props);

		this.state = {

		};
	}

    componentDidMount = () => {

    }

	handleOnChange = e => {
		const { onChange } = this.props;
		const dataGrid = this.props['data-grid'] || {};

		onChange && onChange(dataGrid);
	}

    render = () => {
    	const { children, title } = this.props;

    	return (
    		<div { ...this.props }>
    			<div style={{ background: '#ccc', height: 30 }}>
    				<Icon type='delete' theme='outlined' style={{ cursor: 'pointer', float: 'right', padding: 5 }} onMouseDown={ this.handleOnChange } />
    				<span>{ title }</span>
    			</div>

    			{ children }
    		</div>
    	);
    }
}