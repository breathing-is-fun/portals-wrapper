/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-10 10:12:51
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-15 10:07:14
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
	}

    componentDidMount = () => {
    	this.loadPropertyDatas(this.props.visible);
    }

	loadPropertyDatas = visible => {
		if(visible) {
			const { style } = this.props.dataSource;

			this.loader.load(style, propertyDatas => {
				this.setState({ propertyDatas });
			});
		}
	}

	handleInput = (value, key) => {
		console.log(value, key);
	}

    render = () => {
    	const { visible, onClose, dataSource } = this.props;
    	const { title } = dataSource;
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
    							const { key, value, text } = item;

    							return (
    								<li key={ `property-li-${ key }` }>
    									<div className='property-key'>{ text }：</div>
    									<div className='property-value'>
    										<Input onChange={ e => this.handleInput(e.target.value, key) } value={ value } />
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