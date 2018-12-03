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

const StyleDescription = props => (
  <Bundle load={ () => import('../modules/StyleDescription') }>
    { StyleDescription => <StyleDescription { ...props }/> }
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
	        <Route path='/style' component={ StyleDescription } />
	      </div>
	    </HashRouter>
	  );
	}
}