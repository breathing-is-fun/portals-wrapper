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
		showDetail: false,
		detailPath: '',
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

	handleOnDetail = e => {
		const { onDetail } = this.props;
		const dataGrid = this.props['data-grid'] || {};

		this.preventBubble(e);

		onDetail && onDetail(dataGrid);
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
    		style,
    		showDetail,
    	} = this.props;
    	const { title } = this.state;

    	const editButton = (
    		<Icon
    			type='edit'
    			theme='outlined'
    			className='operation'
    			onMouseDown={ this.handleOnEdit }
    			style={{ right: 40 }}
    		/>
    	);
    	const deleteButton = (
    		<Icon
    			type='delete'
    			theme='outlined'
    			className='operation'
    			onMouseDown={ this.handleOnDelete }
    			style={{ right: 10 }}
    		/>
    	);
    	const detailButton = (
    		<Icon
    			type='small-dash'
    			theme='outlined'
    			className='operation'
    			onMouseDown={ this.handleOnDetail }
    			style={{ right: 10, fontSize: '2vw' }}
    		/>
    	);

    	const newProps = omit(this.props, [
    		'isDelete',
    		'onDelete',
    		'showDetail',
    		'onEdit',
    		'isEdit',
    		'title',
    		'showTitle',
    		'onDetail',
    		'detailPath',
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

    			{ showDetail && detailButton }

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
	showDetail: PropTypes.bool,
	detailPath: PropTypes.string,
	onDetail: PropTypes.func,
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