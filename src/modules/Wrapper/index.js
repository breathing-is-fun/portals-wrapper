/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-26 11:25:50
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-26 14:12:13
 */
import React, { Component } from 'react';

import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

export default class Wrapper extends Component {
	constructor (props) {
		super(props);

		this.state = {

		};
	}

    componentDidMount = () => {

    }

    handleLayoutChange = layout => {
    	console.log(layout);
    }

    render = () => {
    	const layout = [
    		{ i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
    		{ i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    		{ i: 'c', x: 4, y: 0, w: 1, h: 2 }
    	];

    	return (
    		<div className='Wrapper'>
    			<GridLayout className='layout' layout={ layout } cols={ 12 } rowHeight={ 30 } width={ 1200 } margin={ [0, 0] } onLayoutChange={ this.handleLayoutChange }>
    				<div key='a' style={{ background: '#F96' }}>static</div>
    				<div key='b' style={{ background: '#aaa' }}>b</div>
    				<div key='c' style={{ background: '#ccc' }}>c</div>
    			</GridLayout>
    		</div>
    	);
    }
}