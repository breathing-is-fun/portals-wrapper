/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-10 10:12:51
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-29 14:10:04
 */
import React, { Component } from 'react';

import { Drawer, Icon, Input } from 'antd';
import Loader from './PropertyLoader';

import './css/PropertyBoard.css';

export default class PropertyBoard extends Component {
	constructor (props) {
		super(props);

		this.state = {
			propertyDatas: [],
		};

		this.loader = new Loader();
		this.currentShellStyle = {};
	}

    componentDidMount = () => {
    	this.loadPropertyDatas(this.props.visible);
    }

	loadPropertyDatas = visible => {
		if(visible) {
			const { shellStyleDatas, enumDatas } = this.props;
			const { i: key, style } = shellStyleDatas;

			this.loader.load(enumDatas, style, key, propertyDatas => this.setState({ propertyDatas }));
		}
	}

	handleInput = (value, key, id) => {
		const { onChange } = this.props;

		this.currentShellStyle[key] = value;
		this.currentShellStyle.id = id;

		onChange && onChange(this.currentShellStyle);
	}

    render = () => {
    	const { visible, onClose, shellStyleDatas } = this.props;
    	const { title } = shellStyleDatas;
    	const { propertyDatas } = this.state;

    	const drawerTitle = (
    		<div>
    			<Icon type='form' theme='outlined' />
    			<span style={{ paddingLeft: 10 }}>{ `${ title } 外壳属性修改` }</span>
    		</div>
    	);

    	const drawerProps = {
    		visible,
    		className: 'PropertyBoard',
    		onClose: () => onClose && onClose(!visible),
    		title: drawerTitle,
    		width: '20%',
    		destroyOnClose: true,
    	};

    	return (
    		<div className='PropertyBoard'>
    			<Drawer { ...drawerProps }>
    				<ul className='property-wrapper'>
    					{
    						propertyDatas.map(item => {
    							const { key, text, value, id } = item;

    							return (
    								<li key={ `property-li-${ key }` }>
    									<div className='property-key'>{ text }：</div>
    									<div className='property-value'>
    										<Input onBlur={ e => this.handleInput(e.target.value, key, id) } defaultValue={ value } />
    									</div>
    								</li>
    							);
    						})
    					}
    				</ul>
    			</Drawer>
    		</div>
    	);
    }
}