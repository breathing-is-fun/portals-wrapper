/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-15 15:47:19
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-24 16:40:33
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
			CurrentTime: null,
		};
	}

    componentDidMount = () => {
    	this.props.clock && this.loadCurrentTime();
    }

	loadCurrentTime = () => {
		import('./CurrentTime')
			.then(CurrentTime => this.setState({ CurrentTime: CurrentTime.default }));
	}

    getCurrentTime = () => {
    	setInterval(() => {
    		this.setState({ time: moment().format('HH:mm:ss') });
    	}, 1000);
    }

    render = () => {
    	const { children, menu, menuItemOnClick, clock } = this.props;
    	const { CurrentTime } = this.state;

    	// 分割线
    	const space = <div className='content-space' />;

    	const date = (
    		<div className='content-wrapper'>
    			<div className='content-time-detail'>{ moment().format('YYYY-MM-DD') }</div>
    			<div className='content-time-detail'>{ moment().format('dddd') }</div>
    		</div>
    	);

    	const switchMeal = (
    		<Menu>
    			{
    				menu.map(item => {
    					const { text, key } = item;

    					return (
    						<Menu.Item key={ key } onClick={ e => menuItemOnClick && menuItemOnClick(item, e) }>
    							<a rel='noopener noreferrer'>{ text }</a>
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
    					<div className='content-time'>
    						{ CurrentTime && <CurrentTime /> }
    					</div>
    				</div>

    				{ clock && date }

    				<div className='content-wrapper' style={{ float: 'right', marginRight: 20, color: '#FFF' }}>
    					<Dropdown overlay={ switchMeal } trigger={ ['hover', 'click'] }>
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