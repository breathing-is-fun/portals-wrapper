import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import './assets/global.css';

import GlobalModal from './component/GlobalModal';
import Router from './router';
import Store from './localStorage';
import GlobalListener from './localStorage/GlobalListener';

const MOUNT_NODE = document.getElementById('root');

new Store(null, store => {
  window.SCTool = {};
  window.SCTool.modal = {};
  window.SCTool.store = store;
  window.SCTool.listener = new GlobalListener(MOUNT_NODE);

  for(let key in store.get('meta')) {
    window.SCTool.listener.set(key, store.get('meta')[key]);
  }

  ReactDOM.render((
    <div>
      <GlobalModal on={ window.SCTool } />
      <Router />
    </div>
  ), MOUNT_NODE);

  if (module.hot) {
    module.hot.accept();
  }
});