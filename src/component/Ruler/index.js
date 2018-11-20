/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-17 19:57:14
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-20 16:34:12
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './css/Ruler.css';

export default class Ruler extends Component {
	static defaultProps = {
		padding: 35,
	}

	handleScale = type => {
		let cm = [], mm = [];

		// mm
		for(let i = 0; i < 9; i++) {
			mm.push(<div className={ `mm-${ type }` } key={ `mm-${ type }-${ i }` }></div>);
		}

		// cm
		for(let i = 0; i < 10; i++) {
			cm.push(
				<div className={ `cm-${ type }` } key={ `cm-${ type }-${ i }` }>
					{ mm }
				</div>
			);
		}

		return cm;
	}

    render = () => {
    	const { children, padding } = this.props;

    	return (
    		<div className='Ruler'>
    			<div className='wrapper'>
    				{ this.handleScale('horizontal') }
    			</div>

    			<div className='wrapper'>
    				{ this.handleScale('vertical') }
    			</div>

    			<div style={{ padding }}>
    				{ children }
    			</div>
    		</div>
    	);
    }
}

Ruler.propTypes = {
	padding: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
};