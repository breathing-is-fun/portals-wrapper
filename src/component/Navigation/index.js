/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-15 15:47:19
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-21 10:54:59
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Menu, Dropdown, Icon } from 'antd';

import moment from 'moment';
moment.locale('zh-cn');

import './css/Navigation.css';

export default class Navigation extends Component {
	static defaultProps = {
		menu: [],
		clock: false,
	}

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
    	// const space = <div className='content-space' />;

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
    					const { title, id } = item;

    					return (
    						<Menu.Item key={ id } onClick={ e => menuItemOnClick && menuItemOnClick(item) }>
    							<a rel='noopener noreferrer'>{ title }</a>
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

    			<div className='children-wrapper' style={{ height: (document.body.clientHeight - 65) }}>{ children }</div>
    		</div>
    	);
    }
}

Navigation.propTypes = {
	children: PropTypes.any,
	menu: PropTypes.array,
	menuItemOnClick: PropTypes.func,
	clock: PropTypes.bool,
};