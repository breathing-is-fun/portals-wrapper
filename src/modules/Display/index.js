/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-28 09:01:44
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-05 11:16:56
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
    	this.loadMenu();

    	window.onresize = () => {
    		this.setState({});
    	};
    }

	loadLayout = id => {
		ajax({
			key: 's_slmh_meal_layout_data',
			data: { id },
			success: ({ data: result }) => {
				let layout = [];

				for(let item of result) {
					let { style } = item;

					if(typeof style == 'string') {
						item.style = JSON.parse(style);
					}

					layout.push(item);
				}
				this.setState({ layout }, () => {
					this.grid.mountRoots();
				});
			}
		});
	}

	loadMenu = () => {
		ajax({
			key: 's_slmh_meal_switch',
			data: { id: 1 },
			success: ({ data: menuDatas }) => {
				this.setState({ menuDatas }, () => {
					menuDatas.length != 0 && this.loadLayout(menuDatas[0].id);
				});
			},
		});
	}

    render = () => {
    	const { layout, menuDatas } = this.state;

    	return (
    		<Navigation menuItemOnClick={ ({ id }) => this.loadLayout(id) } menu={ menuDatas } clock>
    			<Grid isEdit={ false } isDelete={ false } layout={ layout } ref={ ref => ref && (this.grid = ref) } />
    		</Navigation>
    	);
    }
}