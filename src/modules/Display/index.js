/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-28 09:01:44
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-01 19:53:32
 */
import React, { Component } from 'react';

import Grid from '../../component/Gird';
import Navigation from '../../component/Navigation';
import { ajax } from '../../urlHelper';

export default class Display extends Component {
	constructor (props) {
		super(props);

		this.state = {
			layout: [],
			menuDatas: [],
		};
	}

    componentDidMount = () => {
    	this.loadLayout('layoutDatas');

    	this.loadMenu();
    }

	loadLayout = path => {
		ajax({
			key: 's_slmh_meal_layout_data',
			success: ({ data: layout }) => this.setState({ layout })
		});
	}

	loadMenu = () => {
		ajax({
			key: 'switchMealDatas',
			success: ({ data: menuDatas }) => this.setState({ menuDatas }),
		});
	}

    render = () => {
    	const { layout, menuDatas } = this.state;

    	return (
    		<Navigation menuItemOnClick={ ({ url }) => this.loadLayout(url) } menu={ menuDatas } clock>
    			<Grid isEdit={ false } isDelete={ false } layout={ layout } />
    		</Navigation>
    	);
    }
}