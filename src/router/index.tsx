import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ajax } from '../urlHelper';

const ComponentEdit = React.lazy(() => import('../modules/ComponentEdit'));
const ModuleEdit = React.lazy(() => import('../modules/ModuleEdit'));
const Display = React.lazy(() => import('../modules/Display'));
const StyleDescription = React.lazy(() =>
  import('../modules/StyleDescription'),
);
const UploadComponentCheck = React.lazy(() =>
  import('../modules/UploadComponentCheck'),
);
const UploadComponent = React.lazy(() => import('../modules/UploadComponent'));

interface dataItem {
  path: string;
  id: string | number;
}
interface EntryState {
  data: Array<dataItem>;
}

export default class Entry extends Component<any, EntryState> {
  constructor(props: any) {
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
        <React.Suspense fallback={<div>加载中...</div>}>
          <Switch>
            <Route
              path="/edit/component"
              component={(props: any) => <ComponentEdit {...props} />}
            />
            <Route
              path="/edit/module"
              component={(props: any) => <ModuleEdit {...props} />}
            />
            <Route
              path="/display"
              component={(props: any) => <Display {...props} />}
            />
            <Route
              path="/style"
              component={(props: any) => <StyleDescription {...props} />}
            />
            <Route
              path="/upload/component"
              component={(props: any) => <UploadComponent {...props} />}
            />
            {data.map(item => {
              const { id, path } = item;
              return (
                <Route
                  key={id}
                  path={`/upload/check/${path}`}
                  component={(props: any) => (
                    <UploadComponentCheck {...props} />
                  )}
                />
              );
            })}
          </Switch>
        </React.Suspense>
      </Router>
    );
  };
}
