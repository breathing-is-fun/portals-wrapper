/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-28 09:01:44
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-15 14:28:26
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
    	this.validateTicket(() => this.loadMenu());

    	window.onresize = () => {
    		this.setState({});
    	};
    }

	validateTicket = callback => {
		const ticket = this.getParams('ticket');

		if(!ticket) {
			return;
		}

		ajax({
			key: 'login-ticket',
			data: { ticket },
			success: ({ data }) => {
				window.SCTool.ticket = data;

				callback && callback();
			},
		});
	}

	getParams = name => {
    	let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    	let result = window.location.href.split('?').length > 1 ? window.location.href.split('?')[1].match(reg) : 0;

    	if (result != null) {
    		return result[2] === 'undefined' ? undefined : result[2];
    	}

    	return null;
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