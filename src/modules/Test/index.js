/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-17 19:57:14
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-18 10:47:08
 */
import React, { Component } from 'react';

import Ruler from '../../component/Ruler';

import './css/Test.css';

export default class Test extends Component {
    render = () => {
    	return (
    		<div className='Test'>
    			<Ruler>
					test
    			</Ruler>
    		</div>
    	);
    }
}