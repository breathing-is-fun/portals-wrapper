/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-26 11:25:50
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-28 15:30:02
 */
import React, { Component } from 'react';

import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

export default class Wrapper extends Component {
	constructor (props) {
		super(props);

		this.state = {
			layout: [],
		};
	}

    componentDidMount = () => {
    	this.loadLayout(() => {
    		// const { layout } = this.state;
    		// let pathArr = [];

    		// for(let item of layout) {
    		// 	const { path } = item;

    		// 	pathArr.push(`import('${ path }')`);
    		// }
    		// pathArr = `[${ pathArr.toString() }]`;

    		// /* eslint-disable no-eval */
    		// Promise.all(eval(`${ pathArr }`)).then(modules => {
    		// 	for(let i = 0; i < layout.length; i++) {
    		// 		const { TestModule } = modules[i];
    		// 		const { i: key } = layout[i];
    		// 		const testModule = new TestModule(this[key]);
    		// 		const { _moduleOnMount } = testModule;

    		// 		_moduleOnMount && _moduleOnMount.call(testModule);
    		// 	}
    		// });
    	});
    }

	loadLayout = callback => {
		fetch('../../../mock/layoutDatas.json')
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
    					layout.map(item => {
    						const { i, type, path } = item;

    						return type == 'iframe' ? (
    							<div key={ i } data-grid={ item }>
    								<iframe src={ path } style={{ border: 'none', width: '100%', height: '100%', overflow: 'auto' }}></iframe>
    							</div>
    						) : (
    							<div key={ i } data-grid={ item } style={{ background: '#ccc' }} ref={ ref => this[i] = ref } />
    						);
    					})
    				}
    			</GridLayout>
    		</div>
    	);
    }
}