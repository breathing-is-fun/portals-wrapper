/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-23 10:59:12
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-23 11:00:48
 */
import React, { Component } from 'react';

import moment from 'moment';

export default class CurrentTime extends Component {
	constructor (props) {
		super(props);

		this.state = {
			time: moment().format('HH:mm:ss')
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
    	const { time } = this.state;

    	return (
    		<div className='CurrentTime'>{ time }</div>
    	);
    }
}