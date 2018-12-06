import React, { Component, Suspense, lazy } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Login from '../modules/Login';
const ComponentEdit = lazy(() => import('../modules/ComponentEdit'));
const ModuleEdit = lazy(() => import('../modules/ModuleEdit'));
const Display = lazy(() => import('../modules/Display'));
const StyleDescription = lazy(() => import('../modules/StyleDescription'));

export default class Entry extends Component {
  render = () => {
    return (
      <Router>
        <Suspense fallback={<Login />}>
          <Switch>
            <Route
              path='/edit/component'
              component={props => <ComponentEdit {...props} />}
            />
            <Route
              path='/edit/module'
              component={props => <ModuleEdit {...props} />}
            />
            <Route
              path='/display'
              component={props => <Display {...props} />}
            />
            <Route
              path='/style'
              component={props => <StyleDescription {...props} />}
            />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}