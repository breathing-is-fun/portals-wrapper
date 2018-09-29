/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-29 10:26:03
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-29 10:27:38
 */
import React, { Component } from 'react';

import Grid from './Grid';
import DraggableMenu from './DraggableMenu';

export default class Wrapper extends Component {
    render = () => {
    	return (
    		<div className='Wrapper'>
    			<DraggableMenu />
    			<Grid />
    		</div>
    	);
    }
}