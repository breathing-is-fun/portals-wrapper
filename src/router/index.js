/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-06-12 09:43:22
 * @Last Modified by: zy9
 * @Last Modified time: 2018-09-28 09:02:03
 */
import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';

// import Wrapper from '../modules/Wrapper';

import Bundle from '../../util/Bundle';

const Wrapper = props => (
	<Bundle load={ () => import('../modules/Wrapper') }>
		{ Wrapper => <Wrapper { ...props }/> }
	</Bundle>
);

const Display = props => (
	<Bundle load={ () => import('../modules/Display') }>
		{ Display => <Display { ...props }/> }
	</Bundle>
);

export default class Router extends Component {
    render = () => {
    	return (
    		<HashRouter>
    			<div>
    				<Route path='/wrapper' component={ Wrapper } />
    				<Route path='/display' component={ Display } />
    			</div>
    		</HashRouter>
    	);
    }
}