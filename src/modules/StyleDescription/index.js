/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-11-07 13:34:43
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-07 14:44:29
 */
import React, { Component } from 'react';

import LoadMenu from './LoadMenu';

export default class StyleDescription extends Component {
	constructor (props) {
		super(props);

		this.state = {
			CurrentComponent: null,
		};
	}

    componentDidMount = () => {
    	this.generateChild('HomePage');
    }

	handleMenuClick = loadKey => {
		this.generateChild(loadKey);
	}

	generateChild = loadKey => {
		import(`./${ loadKey }.js`).then(module => this.setState({ CurrentComponent: module.default || module }));
	}

	render = () => {
		const { CurrentComponent } = this.state;

		return (
			<div className='StyleDescription'>
				<LoadMenu onClick={ this.handleMenuClick }>
					{ CurrentComponent && <CurrentComponent /> }
				</LoadMenu>
			</div>
		);
	}
}