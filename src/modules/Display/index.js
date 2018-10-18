/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-09-28 09:01:44
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-18 16:29:45
 */
import React, { Component } from 'react';

import Grid from '../../component/Gird';
import Navigation from '../../component/Navigation';

export default class Display extends Component {
    render = () => {
    	return (
    		<Navigation>
    			<Grid isEdit={ false } isDelete={ false } />
    		</Navigation>
    	);
    }
}