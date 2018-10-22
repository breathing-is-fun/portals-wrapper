/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-17 19:57:14
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-21 14:06:03
 */
import React, { Component } from 'react';

import { Slider, Switch } from 'antd';

import './css/Test.css';

export default class Test extends Component {
	state = {
		disabled: false,
	}

	render = () => {
		const { disabled } = this.state;

		return (
			<div className='Test' onClick={ () => this.setState({ visible: true }) }>
				<Slider defaultValue={ 30 } disabled={ disabled } defaultToolTip />
				<Slider range defaultValue={ [20, 50] } disabled={ disabled } />
			</div>
		);
	}
}