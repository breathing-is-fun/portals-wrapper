/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-26 11:25:50
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-27 14:04:40
 */
import React, { Component } from 'react';

import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { testModule } from '../../../demo/module_4/testModule';

export default class Wrapper extends Component {
	constructor (props) {
		super(props);

		this.state = {
			layout: [],
		};
	}

    componentDidMount = () => {
    	this.loadLayout(() => {
    		testModule(this.testDom);
    	});
    }

	loadLayout = callback => {
		fetch('../../mock/layoutDatas.json')
			.then(result => result.json())
			.then(result => {
				const { layout } = result;

				this.setState({ layout }, () => callback && callback());
			});
	}

    handleLayoutChange = layout => {
    	// console.log(layout);
    }

    render = () => {
    	const { layout } = this.state;

    	const layoutProps = {
    		className: 'layout',
    		// layout,
    		cols: 12,
    		rowHeight: 30,
    		width: document.documentElement.clientWidth || document.body.clientWidth,
    		margin: [10, 10],
    		onLayoutChange: this.handleLayoutChange
    	};

    	return (
    		<div className='Wrapper'>
    			<GridLayout { ...layoutProps }>
    				{
    					layout.map((item, index) => {
    						const { i } = item;

    						return <div key={ i } data-grid={ item } style={{ background: '#ccc' }} ref={ ref => this.testDom = ref } />;
    					})
    				}
    			</GridLayout>
    		</div>
    	);
    }
}