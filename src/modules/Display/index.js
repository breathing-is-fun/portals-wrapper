/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-28 09:01:44
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-08 14:55:29
 */
import React, { Component } from 'react';

import Grid from '../../component/Gird';

export default class Display extends Component {
    render = () => {
    	return (
    		<div className='Display'>
    			<Grid isEdit={ false } />
    		</div>
    	);
    }
}