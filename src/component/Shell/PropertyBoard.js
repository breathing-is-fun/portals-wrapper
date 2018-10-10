/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-10 10:12:51
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-10 11:10:04
 */
import React, { Component } from 'react';

import { Drawer, Icon } from 'antd';

export default class PropertyBoard extends Component {
	constructor (props) {
		super(props);

		this.state = {

		};
	}

    componentDidMount = () => {

    }

    render = () => {
    	const { visible, onClose, dataSource } = this.props;
    	const { style, title } = dataSource;

    	const drawerTitle = (
    		<div>
    			<Icon type='form' theme='outlined' />
    			<span style={{ paddingLeft: 10 }}>{ title }</span>
    		</div>
    	);

    	const drawerProps = {
    		visible,
    		className: 'PropertyBoard',
    		onClose: () => onClose && onClose(!visible),
    		title: drawerTitle,
    	};

    	return (
    		<div className='PropertyBoard'>
    			<Drawer { ...drawerProps }>

    			</Drawer>
    		</div>
    	);
    }
}