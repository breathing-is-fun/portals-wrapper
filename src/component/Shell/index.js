import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'antd';
import omit from 'omit.js';

import './css/Shell.css';

export default class Shell extends Component {
	constructor (props) {
		super(props);
		const { title } = props;

		this.state = {
			title,
			propertyBoardVisible: false,
			propertyBoardDataSource: {}
		};
	}

	static defaultProps = {
		isEdit: false,
		isDelete: false,
		type: 'component',
		showTitle: true,
		style: {},
		title: null,
		'data-grid': {},
	}

	handleOnDelete = e => {
		const { onDelete } = this.props;
		const dataGrid = this.props['data-grid'] || {};

		this.preventBubble(e);

		onDelete && onDelete(dataGrid);
	}

	handleOnEdit = e => {
		const { style, onEdit } = this.props;
		const dataGrid = this.props['data-grid'] || {};

		this.preventBubble(e);

		this.setState({
			propertyBoardVisible: true,
			propertyBoardDataSource: { title: dataGrid.title || '', style },
		}, () => {
			onEdit && onEdit(true);
		});
	}

	// 阻止react-grid-layout的拖拽事件在点击时生效
	preventBubble = e => {
		if(e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	}

	handleDrawerOnClose = propertyBoardVisible => {
		const { onEdit } = this.props;

		this.setState({ propertyBoardVisible }, () => {
			onEdit && onEdit(propertyBoardVisible);
		});
	}

    render = () => {
    	const {
    		children,
    		isEdit,
    		isDelete,
    		type,
    		onClick,
    		showTitle,
    		style
    	} = this.props;
    	const { title } = this.state;

    	const editButton = (
    		<Icon
    			type='edit'
    			theme='outlined'
    			className='operation'
    			onMouseDown={ this.handleOnEdit }
    			style={{ right: 22 }}
    		/>
    	);
    	const deleteButton = (
    		<Icon
    			type='delete'
    			theme='outlined'
    			className='operation'
    			onMouseDown={ this.handleOnDelete.bind(this) }
    			style={{ right: 0 }}
    		/>
    	);

    	const newProps = omit(this.props, [
    		'isDelete',
    		'onDelete',
    		'onEdit',
    		'isEdit',
    		'title',
    		'showTitle',
    	]);

    	return (
    		<div
    			{ ...newProps }
    			style={ style }
    			className={ `Shell${ type != 'component' ?
    				' border-transition' :
    				'' }`
    			}
    			onClick={ e => type == 'add' && onClick && onClick(e) }
    		>
    			{ isDelete && deleteButton }

    			{ isEdit && editButton }

    			{
    				type != 'add' &&
					showTitle &&
					<span className='operation-title'>{ title }</span>
    			}

    			{ children }
    		</div>
    	);
    }
}

Shell.propTypes = {
	isEdit: PropTypes.bool,
	isDelete: PropTypes.bool,
	type: PropTypes.oneOf(['add', 'module', 'component']),
	onClick: PropTypes.func,
	showTitle: PropTypes.bool,
	style: PropTypes.object,
	title: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.string,
	]),
	onDelete: PropTypes.func,
	'data-grid': PropTypes.object,
	onEdit: PropTypes.func,
};