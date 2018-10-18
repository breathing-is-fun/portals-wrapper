/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-17 19:57:14
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-18 10:46:18
 */
import React, { Component } from 'react';

import './css/Ruler.css';

export default class Ruler extends Component {
	handleScale = type => {
		let cm = [], mm = [];

		// mm
		for(let i = 0; i < 9; i++) {
			mm.push(<div className={ `mm-${ type }` } key={ `mm-${ type }-${ i }` }></div>);
		}

		// cm
		for(let i = 0; i < 10;i ++) {
			cm.push(
				<div className={ `cm-${ type }` } key={ `cm-${ type }-${ i }` }>
					{ mm }
				</div>
			);
		}

		return cm;
	}

    render = () => {
    	return (
    		<div className='Ruler'>
    			<div className='wrapper'>
    				{ this.handleScale('horizontal') }
    			</div>

    			<div className='wrapper' style={{ height: '100%' }}>
    				{ this.handleScale('vertical') }
    			</div>
    		</div>
    	);
    }
}