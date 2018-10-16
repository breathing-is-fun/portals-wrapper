/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-16 10:30:49
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-16 17:31:57
 */
import React, { Component } from 'react';

import Shell from '../../component/Shell';

import './css/ModuleLayout.css';

export default class ModuleLayout extends Component {
	constructor (props) {
		super(props);

		this.state = {
			layout: [],
		};
	}

	componentDidMount = () => {
		this.loadLayoutDatas();
	}

	loadLayoutDatas = () => {
		fetch('../../../mock/moduleLayoutDatas.json')
			.then(result => result.json())
			.then(result => this.setState({ layout: result.data }));
	}

	handleOnAdd = e => {
		console.log(e);
	}

	render = () => {
		const { layout } = this.state;
		const shellStyle = { zIndex: 1, userSelect: 'none', width: 270, height: 175, background: '#e0e6ee', borderRadius: 2, alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)', float: 'left', margin: '10px 10px' };

		return (
			<div className='ModuleLayout'>
				{
					layout.map(item => {
						const { key, title, isEdit, imgUrl, isDelete } = item;

						const shellProps = {
							key, title, isEdit, isDelete,
							'data-grid': item,
							style: shellStyle,
							onDelete: this.handleShellOnDelete,
							onEdit: isDrawerOpen => this.handleShellonEdit(isDrawerOpen, item),
						};

						return (
							<Shell { ...shellProps }>
								<img src={ imgUrl } style={{ width: '100%', height: 'calc(100% - 30px)' }} />
							</Shell>
						);
					})
				}

				<Shell key='add' style={ Object.assign({}, shellStyle, { display: 'flex', margin: '40px 10px', height: 145 }) } type='add' onClick={ this.handleOnAdd }>
					<i className='plus-icon'>+</i>
				</Shell>
			</div>
		);
	}
}