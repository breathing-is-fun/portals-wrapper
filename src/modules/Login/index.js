/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-11-08 19:18:05
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-08 19:29:37
 */
import React, { Component } from 'react';

import './css/Login.css';

export default class index extends Component {
	constructor (props) {
		super(props);

		this.state = {
			ticket: '参数获取中...',
		};

		if(!window.SCTool) {
			window.SCTool = {};
		}
	}

    componentDidMount = () => {
    	const ticket = this.getParams('ticket');

    	this.setState({ ticket });
    }

    getParams = name => {
    	let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'); // 匹配目标参数
    	let result = window.location.href.split('?').length > 1 ? window.location.href.split('?')[1].match(reg) : 0; // 对querystring匹配目标参数

    	if (result != null) {
    		return result[2] === 'undefined' ? undefined : result[2];
    	}

    	return null;
    }

    render = () => {
    	const { ticket } = this.state;

    	return (
    		<div className='Login' style={{ height: document.documentElement.clientHeight || document.body.clientHeight }}>
    			{ ticket }
    		</div>
    	);
    }
}