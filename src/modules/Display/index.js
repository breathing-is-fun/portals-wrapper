import React, { Component } from 'react';

import Grid from '../../component/Grid';
import Navigation from '../../component/Navigation';
import { ajax } from '../../urlHelper';
import { message } from 'antd';
message.config({
	top: 100,
	maxCount: 3,
});

import './css/Display.css';

export default class Display extends Component {
	constructor (props) {
		super(props);

		this.state = {
			layout: [],
			menuDatas: [],
			loading: true,
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
			message.error('ticket is null.');
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
		let result = window.location.href.split('?').length > 1 ?
			window.location.href.split('?')[1].match(reg) :
			0;

    	if (result != null) {
    		return result[2] === 'undefined' ? undefined : result[2];
    	}

    	return null;
	}

	loadLayout = id => {
		this.setState({ loading: true });

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
				this.setState({ layout, loading: false }, () => {
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

	handleOnDetail = item => {
		const { title, detailpath: detailPath } = item;

		window.SCTool.modal = {
			visible: true,
			title,
			mask: false,
			width: '100%',
			style: { top: 65 },
			content: (
				<iframe
					src={ detailPath }
					style={{
						border: 'none',
						width: '100%',
						height: document.body.clientHeight - 55 - 24 - 65,
					}}></iframe>
			)
		};
	}

    render = () => {
    	const { layout, menuDatas, loading } = this.state;

    	const title = SCTool.listener.get('systemTitle');

    	return (
    		<Navigation
    			onClick={ ({ id }) => this.loadLayout(id) }
    			datas={ menuDatas }
    			clock
    			title={ title }
    		>
    			{
    				!loading &&
					<Grid
    					showEdit={ false }
    					showDelete={ false }
						layout={ layout }
						onDetail={ this.handleOnDetail }
    					ref={ ref => ref && (this.grid = ref) }
    				/>
    			}
    		</Navigation>
    	);
    }
}