/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-08 10:39:22
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-09 10:58:01
 */
import React, { Component } from 'react';

export default class Shell extends Component {
	constructor (props) {
		super(props);

		this.state = {

		};
	}

    componentDidMount = () => {

    }

    render = () => {
    	const { children, title } = this.props;

    	return (
    		<div { ...this.props }>
    			{ title }
    			{ children }
    		</div>
    	);
    }
}