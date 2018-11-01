/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-28 17:29:59
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-01 16:32:27
 */
import React, { Component } from 'react';

import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

import DragMenuItem from './DragMenuItem';

export default class DraggableMenu extends Component {
	constructor (props) {
		super(props);

		this.state = {
			currentShellStyle: {},
		};

		this.menuSelectPrefix = 'dragMenuItem';
	}

    componentDidMount = () => {

    }

	handleMenuClick = ({ item, key, keyPath }) => {
		const { onClick } = this.props;

		// onClick && onClick(key.split(this.menuSelectPrefix)[1], [key]);
		const { item: propsItem = {} } = item.props;

		onClick && onClick(propsItem ? propsItem.group : null, [keyPath[keyPath.length - 1] + propsItem.id], propsItem.id);
	}

	handleShellStyle = currentShellStyle => this.setState({ currentShellStyle });

    render = () => {
    	const { type = 'component', shellStyleDatas = [], menuDatas = [], openKeys, selectedKeys, onOpenChange, onSave } = this.props;
    	const { currentShellStyle } = this.state;

    	const menuProps = {
    		// style: { width: 256 },
    		openKeys,
    		selectedKeys: [this.menuSelectPrefix + selectedKeys[0]],
    		mode: 'inline',
    		onOpenChange,
    		onClick: this.handleMenuClick,
    	};

    	const hrefToDisplay = (
    		<Menu.Item key='back' onClick={ () => location.hash = '/display' }>
    			<Icon type='arrow-left' theme='outlined' />
    			<span>首页</span>
    		</Menu.Item>
    	);

    	const styleSubMenu = (
    		<Menu.Item key='back' onClick={ () => onSave && onSave() }>
    			<Icon type='arrow-left' theme='outlined' />
    			<span>保存并返回</span>
    		</Menu.Item>
    	);

    	return (
    		<div className='DraggableMenu'>

    			<Menu { ...menuProps }>
    				{ type == 'module' && hrefToDisplay }

    				{ type == 'component' && styleSubMenu }

    				{
    					menuDatas.map(item => {
    						const { groupName, children = [], group } = item;

    						const subMenuTitle = (
    							<span>
    								<Icon type='laptop' theme='outlined' />
    								<span>{ groupName }</span>
    							</span>
    						);

    						return (
    							<SubMenu key={ group } title={ subMenuTitle }>
    								{
    									children.map((jtem, j) => {
    										const { group, id } = jtem;

    										return <DragMenuItem key={ `${ this.menuSelectPrefix }${ group }${ id }` } item={ Object.assign({}, jtem, { style: currentShellStyle }) } />;
    									})
    								}
    							</SubMenu>
    						);
    					})
    				}
    			</Menu>
    		</div>
    	);
    }
}