/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-11-07 13:34:43
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-12 14:23:23
 */
import React, { Component } from 'react';

import LoadMenu from './LoadMenu';
import RenderHtml from './RenderHtml';

import { ajax } from '../../urlHelper';

export default class StyleDescription extends Component {
	constructor (props) {
		super(props);

		this.state = {
			paths: ['HomePage'],
			menuDatas: [],
		};
	}

    componentDidMount = () => {
    	this.loadMenuDatas();
    }

	loadMenuDatas = () => {
		ajax({
			key: 'style_menu_data',
			success: ({ data: menuDatas }) => this.setState({ menuDatas }),
		});
	}

	handleMenuClick = paths => this.setState({ paths })

	render = () => {
		const { paths, menuDatas } = this.state;

		return (
			<div className='StyleDescription'>
				<LoadMenu onClick={ this.handleMenuClick } menuDatas={ menuDatas }>
					<RenderHtml paths={ paths } />
				</LoadMenu>
			</div>
		);
	}
}