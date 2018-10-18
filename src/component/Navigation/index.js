/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-15 15:47:19
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-18 16:38:28
 */
import React, { Component } from 'react';

import moment from 'moment';
moment.locale('zh-cn');

import './css/Navigation.css';

export default class Navigation extends Component {
	constructor (props) {
		super(props);

		this.state = {
			time: moment().format('HH:mm:ss'),
		};
	}

    componentDidMount = () => {
    	this.getCurrentTime();
    }

    getCurrentTime = () => {
    	setInterval(() => {
    		this.setState({ time: moment().format('HH:mm:ss') });
    	}, 1000);
    }

    render = () => {
    	const { children } = this.props;
    	const { time } = this.state;

    	// 分割线
    	const space = <div className='content-space' />;

    	return (
    		<div className='Navigation'>
    			<div className='content'>
    				<div className='content-wrapper' style={{ width: '15%' }}>浙江省水利综合门户</div>

    				{/* { space } */}
    				<div className='content-wrapper' style={{ width: '15%' }}>
    					<div className='content-time'>{ time }</div>
    				</div>

    				<div className='content-wrapper' style={{ marginLeft: '-3.5%' }}>
    					<div className='content-time-detail'>{ moment().format('YYYY-MM-DD') }</div>
    					<div className='content-time-detail'>{ moment().format('dddd') }</div>
    				</div>
    			</div>

    			{ children }
    		</div>
    	);
    }
}