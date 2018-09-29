/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-26 11:25:50
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-29 15:46:01
 */
import React, { Component } from 'react';

import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

export default class Grid extends Component {
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
    			const { path, type } = item;

    			type != 'iframe' && pathArr.push(`import('${ path }')`);
    		}
    		pathArr = `[${ pathArr.toString() }]`;

    		/* eslint-disable no-eval */
    		Promise.all(eval(`${ pathArr }`)).then(modules => {
    			for(let i = 0; i < modules.length; i++) {
    				const { TestModule } = modules[i];
    				const { i: key } = layout[i];
    				const testModule = new TestModule(this[key]);
    				const { _moduleOnMount } = testModule;

    				_moduleOnMount && _moduleOnMount.call(testModule);
    			}
    		});
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
    	console.log(layout);
    }

	handleDragDrop = e => {
		let { layout } = this.state;
		const item = JSON.parse(e.dataTransfer.getData('menuItemToGrid'));
		const { key, url, text } = item;

		layout.push({
			i: '' + key + layout.length,
			x: (layout.length * 2) % 12,
			y: Infinity,
			w: 2,
			h: 9,
			type: 'iframe',
			imgUrl: url,
			title: text
		});

		this.setState({ layout });
	}

    render = () => {
    	const { layout } = this.state;

    	const layoutProps = {
    		className: 'layout',
    		// layout,
    		cols: 12,
    		rowHeight: 30,
    		width: (document.documentElement.clientWidth || document.body.clientWidth) - 256,
    		margin: [10, 10],
    		onLayoutChange: this.handleLayoutChange,
    	};

    	return (
    		<div className='Grid' onDrop={ this.handleDragDrop } onDragOver={ e => e.preventDefault() }>
    			<GridLayout { ...layoutProps }>
    				{
    					layout.map(item => {
    						const { i, type, imgUrl, title } = item;

    						return type == 'iframe' ? (
    							<div key={ i } data-grid={ item } style={{ zIndex: 1 }}>
    								<div style={{ height: 30, background: '#F96' }}>{ title }</div>
    								<img src={ imgUrl } style={{ width: '100%', height: 'calc(100% - 30px)' }} />
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