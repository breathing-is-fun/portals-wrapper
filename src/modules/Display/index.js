/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-28 09:01:44
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-28 09:33:59
 */
import React, { Component } from 'react';

import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

export default class Display extends Component {
	constructor (props) {
		super(props);

		this.state = {
			layout: [],
		};
	}

    componentDidMount = () => {
    	this.loadLayout(() => {
    		const { layout } = this.state;
    		let pathArr = [];

    		for(let item of layout) {
    			const { path } = item;

    			pathArr.push(`import('${ path }')`);
    		}
    		pathArr = `[${ pathArr.toString() }]`;

    		/* eslint-disable no-eval */
    		Promise.all(eval(`${ pathArr }`)).then(modules => {
    			for(let i = 0; i < layout.length; i++) {
    				const { TestModule } = modules[i];
    				const { i: key } = layout[i];

    				new TestModule(this[key]);
    			}
    		});
    	});
    }

    transStaticDatas = dataSource => {
    	let result = [];

    	for(let item of dataSource) {
    		result.push(Object.assign({}, item, { static: true }));
    	}

    	return result;
    }

    loadLayout = callback => {
    	fetch('../../../mock/layoutDatas.json')
    		.then(result => result.json())
    		.then(result => {
    			const { layout } = result;

    			this.setState({ layout: this.transStaticDatas(layout) }, () => callback && callback());
    		});
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
    	};

    	return (
    		<div className='Display'>
    			<GridLayout { ...layoutProps }>
    				{
    					layout.map(item => {
    						const { i } = item;

    						return <div key={ i } data-grid={ item } style={{ background: '#ccc' }} ref={ ref => this[i] = ref } />;
    					})
    				}
    			</GridLayout>
    		</div>
    	);
    }
}