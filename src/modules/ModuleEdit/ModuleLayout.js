/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-16 10:30:49
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-01 17:25:01
 */
import React, { Component } from 'react';

import { reject } from 'lodash';
import { Modal } from 'antd';
import Shell from '../../component/Shell';
import PropertyForm from './PropertyForm';

import './css/ModuleLayout.css';

export default class ModuleLayout extends Component {
	constructor (props) {
		super(props);

		this.state = {
			modalVisible: false,
			currentModalItem: {},
		};
	}

	handleShellOnDelete = dataGrid => {
		const { id } = dataGrid;
		const { layout, onDelete } = this.props;

		onDelete && onDelete(reject(layout, { id }), id);
	}

	handleShellonEdit = (modalVisible, currentModalItem) => {
		this.setState({ modalVisible, currentModalItem });
	}

	render = () => {
		const { layout, isAll } = this.props;
		const { modalVisible, currentModalItem } = this.state;

		const shellStyle = { zIndex: 1, userSelect: 'none', width: '20%', height: 200, background: '#e0e6ee', borderRadius: 2, transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)', float: 'left', margin: 30 };

		const modalProps = {
			title: '套餐基础设置',
			visible: modalVisible,
			onCancel: () => this.setState({ modalVisible: !modalVisible }),
			destroyOnClose: true,
			footer: null,
			width: 700,
		};

		return (
			<div className='ModuleLayout'>
				{
					layout.map(item => {
						const { id, group, title, isedit: isEdit, imgurl: imgUrl, isdelete: isDelete } = item;

						const shellProps = {
							key: group + id,
							title,
							isEdit: isAll,
							isDelete: true,
							type: 'module',
							'data-grid': item,
							style: shellStyle,
							onDelete: this.handleShellOnDelete,
							onEdit: modalVisible => this.handleShellonEdit(modalVisible, item),
						};

						return (
							<Shell { ...shellProps }>
								<img src={ imgUrl } style={{ width: '100%', height: 'calc(100% - 30px)' }} />
							</Shell>
						);
					})
				}

				<Shell key='add' style={ Object.assign({}, shellStyle, { display: 'flex', alignItems: 'center', justifyContent: 'center' }) } type='add' onClick={ () => this.handleShellonEdit(true, {}) }>
					<i className='plus-icon'>+</i>
				</Shell>

				<Modal { ...modalProps }>
					<PropertyForm currentModalItem={ currentModalItem } />
				</Modal>
			</div>
		);
	}
}