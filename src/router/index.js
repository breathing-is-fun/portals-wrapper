import React, { Component, Suspense, lazy } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ajax } from '../urlHelper';

const ComponentEdit = lazy(() => import('../modules/ComponentEdit'));
const ModuleEdit = lazy(() => import('../modules/ModuleEdit'));
const Display = lazy(() => import('../modules/Display'));
const StyleDescription = lazy(() => import('../modules/StyleDescription'));
const UploadComponentCheck = lazy(() =>
  import('../modules/UploadComponentCheck'),
);
const UploadComponent = lazy(() => import('../modules/UploadComponent'));

export default class Entry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount = () => {
    ajax({
      url: '../assets/mapping.json',
      success: ({ data }) => this.setState({ data }),
    });
  };

  render = () => {
    const { data } = this.state;

    return (
      <Router>
        <Suspense fallback={<div>加载中...</div>}>
          <Switch>
            <Route
              path="/edit/component"
              component={props => <ComponentEdit {...props} />}
            />
            <Route
              path="/edit/module"
              component={props => <ModuleEdit {...props} />}
            />
            <Route
              path="/display"
              component={props => <Display {...props} />}
            />
            <Route
              path="/style"
              component={props => <StyleDescription {...props} />}
            />
            <Route
              path="/upload/component"
              component={props => <UploadComponent {...props} />}
            />
            {data.map(item => {
              const { id, path } = item;
              return (
                <Route
                  key={id}
                  path={`/upload/check/${path}`}
                  component={props => <UploadComponentCheck {...props} />}
                />
              );
            })}
          </Switch>
        </Suspense>
      </Router>
    );
  };
}
