/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-06-12 09:43:22
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-15 17:21:33
 */
import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';

import Bundle from '../../util/Bundle';

const ComponentEdit = props => (
	<Bundle load={ () => import('../modules/ComponentEdit') }>
		{ ComponentEdit => <ComponentEdit { ...props }/> }
	</Bundle>
);

const ModuleEdit = props => (
	<Bundle load={ () => import('../modules/ModuleEdit') }>
		{ ModuleEdit => <ModuleEdit { ...props }/> }
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
    				<Route path='/edit/component' component={ ComponentEdit } />
    				<Route path='/edit/module' component={ ModuleEdit } />
    				<Route path='/display' component={ Display } />
    			</div>
    		</HashRouter>
    	);
    }
}