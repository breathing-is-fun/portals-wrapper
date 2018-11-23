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

	generateEditShell = (layout, shellStyle, isAll) => (
		layout.map(item => {
			const {
				id,
				group,
				title,
				isedit: isEdit,
				imgurl: imgUrl,
				isdelete: isDelete,
				showtitle: showTitle
			} = item;

			const shellProps = {
				key: group + id,
				title, showTitle,
				isEdit: isAll,
				isDelete: true,
				type: 'module',
				'data-grid': item,
				style: shellStyle,
				onDelete: this.handleShellOnDelete,
				onEdit: modalVisible => {
					this.handleShellonEdit(modalVisible, item);
				},
			};

			const height = showTitle ? 'calc(100% - 21px)' : '100%';

			return (
				<Shell { ...shellProps }>
					<img src={ imgUrl } style={{
						width: '100%',
						height,
					}} />
				</Shell>
			);
		})
	)

	generateAddShell = shellStyle => (
		<Shell
			key='add'
			style={ Object.assign({}, shellStyle, {
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			}) } type='add'
			onClick={ () => this.handleShellonEdit(true, {}) }
		>
			<i className='plus-icon'>+</i>
		</Shell>
	)

	render = () => {
		const { layout, isAll } = this.props;
		const { modalVisible, currentModalItem } = this.state;

		const shellStyle = {
			width: '20%',
			background: '#e0e6ee',
			float: 'left',
			margin: 30,
			position: 'relative',
		};

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
				{ this.generateEditShell(layout, shellStyle, isAll) }

				{ this.generateAddShell(shellStyle) }

				<Modal { ...modalProps }>
					<PropertyForm currentModalItem={ currentModalItem } />
				</Modal>
			</div>
		);
	}
}