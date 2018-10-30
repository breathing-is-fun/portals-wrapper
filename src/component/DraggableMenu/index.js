/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-28 17:29:59
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-30 19:13:05
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
		onClick && onClick(keyPath[keyPath.length - 1], [key]);
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

    	const styleSubTitle = (
    		<span>
    			<Icon type='retweet' theme='outlined' />
    			<span>样式选择</span>
    		</span>
    	);

    	const hrefToDisplay = (
    		<Menu.Item key='back' onClick={ () => location.hash = '/display' }>
    			<Icon type='arrow-left' theme='outlined' />
    			<span>首页</span>
    		</Menu.Item>
    	);

    	// const styleSubMenu = (
    	// 	<Menu>
    	// 		<Menu.Item key='back' onClick={ () => onSave && onSave() }>
    	// 			<Icon type='arrow-left' theme='outlined' />
    	// 			<span>保存并返回</span>
    	// 		</Menu.Item>

    	// 		<SubMenu title={ styleSubTitle }>
    	// 			{
    	// 				shellStyleDatas.map((item, i) => {
    	// 					const { thumbnailColor, text, style } = item;

    	// 					return (
    	// 						<Menu.Item key={ `shellStyle${ i }` } onClick={ () => this.handleShellStyle(style) }>
    	// 							<div style={{ width: 10, height: 10, marginRight: 10, background: thumbnailColor, display: 'inline-block' }} />
    	// 							<span style={{ userSelect: 'none' }}>{ text }</span>
    	// 						</Menu.Item>
    	// 					);
    	// 				})
    	// 			}
    	// 		</SubMenu>
    	// 	</Menu>
    	// );

    	return (
    		<div className='DraggableMenu'>
    			{/* { type == 'component' && styleSubMenu } */}

    			<Menu { ...menuProps }>
    				{ type == 'module' && hrefToDisplay }

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
    										return <DragMenuItem key={ `dragMenuItem${ jtem.group + j }` } item={ Object.assign({}, jtem, { style: currentShellStyle }) } />;
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