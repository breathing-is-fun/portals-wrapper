/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-11-07 13:34:43
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-12 09:47:38
 */
import React, { Component } from 'react';

import LoadMenu from './LoadMenu';
import RenderHtml from './RenderHtml';

export default class StyleDescription extends Component {
	constructor (props) {
		super(props);

		this.state = {
			path: 'HomePage',
		};
	}

    componentDidMount = () => {

    }

	handleMenuClick = path => this.setState({ path })

	render = () => {
		const { path } = this.state;

		return (
			<div className='StyleDescription'>
				<LoadMenu onClick={ this.handleMenuClick }>
					<RenderHtml paths={ path } />
				</LoadMenu>
			</div>
		);
	}
}