/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-15 15:47:19
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-22 10:13:43
 */
import React, { Component } from 'react';

import { Menu, Dropdown, Icon } from 'antd';

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
    	const { children, menu, mentItemOnClick } = this.props;
    	const { time } = this.state;

    	// 分割线
    	const space = <div className='content-space' />;

    	const switchMeal = (
    		<Menu>
    			{
    				menu.map(item => {
    					const { text, url, key } = item;

    					return (
    						<Menu.Item key={ key }>
    							<a rel='noopener noreferrer' onClick={ e => mentItemOnClick && mentItemOnClick(item, e) }>{ text }</a>
    						</Menu.Item>
    					);
    				})
    			}
    		</Menu>
		  );

    	return (
    		<div className='Navigation'>
    			<div className='content'>
    				<div className='content-wrapper' style={{ width: 300 }}>浙江省水利综合门户</div>

    				{/* { space } */}
    				<div className='content-wrapper' style={{ width: 300 }}>
    					<div className='content-time'>{ time }</div>
    				</div>

    				<div className='content-wrapper'>
    					<div className='content-time-detail'>{ moment().format('YYYY-MM-DD') }</div>
    					<div className='content-time-detail'>{ moment().format('dddd') }</div>
    				</div>

    				<div className='content-wrapper' style={{ float: 'right', marginRight: 20, color: '#FFF' }}>
    					<Dropdown overlay={ switchMeal }>
    						<span className='droplink'>
								套餐切换
    							<Icon type='down' />
    						</span>
    					</Dropdown>
    				</div>
    			</div>

    			{ children }
    		</div>
    	);
    }
}