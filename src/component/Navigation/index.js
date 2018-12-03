import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Menu, Dropdown, Icon } from 'antd';

import moment from 'moment';
moment.locale('zh-cn');

import './css/Navigation.css';

export default class Navigation extends Component {
	static defaultProps = {
	  title: '',
	  datas: [],
	  clock: false,
	}

	constructor (props) {
	  super(props);

	  this.state = {
	    CurrentTime: null,
	    iconRotate: 0,
	    dropDownVisible: false,
	  };
	}

    componentDidMount = () => {
    	this.props.clock && this.loadCurrentTime();
    }

	loadCurrentTime = () => {
		import('./CurrentTime')
		  .then(CurrentTime => {
		    this.setState({ CurrentTime: CurrentTime.default });
		  });
	}

	handleIconType = dropDownVisible => {
	  let { iconRotate } = this.state;

	  iconRotate = dropDownVisible ? '180' : '0';

	  this.setState({ iconRotate, dropDownVisible });
	}

    render = () => {
    	const { children, datas, onClick, clock, title } = this.props;
    	const { CurrentTime, dropDownVisible, iconRotate } = this.state;

    	// 分割线
    	// const space = <div className='content-space' />;

    	const date = (
    		<div className='content-wrapper'>
    			<div className='content-time-detail'>
    				{ moment().format('YYYY-MM-DD') }
    			</div>
    			<div className='content-time-detail'>
    				{ moment().format('dddd') }
    			</div>
    		</div>
    	);

    	const switchMeal = (
    		<Menu>
    			{
    				datas.map(item => {
    					const { title, id } = item;

    					return (
    						<Menu.Item
    							key={ id }
    							onClick={ e => onClick(item) }
    						>
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
    				<div
    					className='content-wrapper'
    					style={{ width: 300 }}
    				>
    					{ title }
    				</div>

    				<div className='content-wrapper' style={{ width: 300 }}>
    					<div className='content-time'>
    						{ CurrentTime && <CurrentTime /> }
    					</div>
    				</div>

    				{ clock && date }

    				<div
    					className='content-wrapper content-switch'
    				>
    					<Dropdown
    						overlay={ switchMeal }
    						trigger={ ['hover', 'click'] }
    						onVisibleChange={ this.handleIconType }
    						visible={ dropDownVisible }
    					>
    						<span className='droplink'>
								套餐切换
    							<Icon
    								type='down'
    								style={{
    									transform: `rotate(${ iconRotate }deg)`,
    								}}
    								className='droplink-icon'
    							/>
    						</span>
    					</Dropdown>
    				</div>
    			</div>

    			<div
    				className='children-wrapper'
    				style={{ height: (document.body.clientHeight - 65) }}
    			>
    				{ children }
    			</div>
    		</div>
    	);
    }
}

Navigation.propTypes = {
  title: PropTypes.string,
  datas: PropTypes.array,
  onClick: PropTypes.func,
  clock: PropTypes.bool,
};