/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-16 10:30:49
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-16 10:36:57
 */
import React, { Component } from 'react';

import { Icon } from 'antd';

import './css/ModuleLayout.css';

export default class ModuleLayout extends Component {
	constructor (props) {
		super(props);

		this.state = {

		};
	}

    componentDidMount = () => {

    }

    render = () => {
    	const addButton = (
    		<div>

    			<div className='add-button'>Upload</div>
    		</div>
    	);

    	return (
    		<div className='ModuleLayout'>
    			{ addButton }
    		</div>
    	);
    }
}