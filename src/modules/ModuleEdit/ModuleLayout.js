/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-16 10:30:49
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-18 15:55:04
 */
import React, { Component } from 'react';

import { reject } from 'lodash';
import { Modal } from 'antd';
import Shell from '../../component/Shell';

import './css/ModuleLayout.css';

export default class ModuleLayout extends Component {
	constructor (props) {
		super(props);

		this.state = {
			modalVisible: false,
		};
	}

	handleOnAdd = e => {
		this.setState({ modalVisible: true });
	}

	handleShellOnDelete = dataGrid => {
		const { key } = dataGrid;
		const { layout, onDelete } = this.props;

		onDelete && onDelete(reject(layout, { key }));
	}

	render = () => {
		const { layout } = this.props;
		const { modalVisible } = this.state;

		const shellStyle = { zIndex: 1, userSelect: 'none', width: '20%', height: 200, background: '#e0e6ee', borderRadius: 2, transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)', float: 'left', margin: 30 };

		const modalProps = {
			title: '套餐设置',
			visible: modalVisible,
			onCancel: () => this.setState({ modalVisible: !modalVisible }),
			cancelText: '取消',
			okText: '确定',
		};

		return (
			<div className='ModuleLayout'>
				{
					layout.map(item => {
						const { key, title, isEdit, imgUrl, isDelete } = item;

						const shellProps = {
							key, title, isEdit, isDelete,
							type: 'module',
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

				<Shell key='add' style={ Object.assign({}, shellStyle, { display: 'flex', alignItems: 'center', justifyContent: 'center' }) } type='add' onClick={ this.handleOnAdd }>
					<i className='plus-icon'>+</i>
				</Shell>

				<Modal { ...modalProps }></Modal>
			</div>
		);
	}
}