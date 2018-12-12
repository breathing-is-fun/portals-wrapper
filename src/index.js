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
  let subscriber = [];

  window.SCTool = {};
  window.SCTool.modal = {};
  window.SCTool.store = store;
  window.SCTool.listener = new GlobalListener(MOUNT_NODE);

  // 分发 Grid 宽高
  window.onresize = e => {
    if (subscriber.length != 0) {
      // onresize执行到这里时，Grid尚未渲染完成
      setTimeout(() => {
        for (let item of subscriber) {
          const { onResize, key } = item;
          const { innerWidth, innerHeight } = e.target;
          const { width, height } = SCTool.listener.get(key);

          onResize && onResize({
            innerHeight,
            innerWidth,
            key,
            width: parseFloat(width.replace('px', '')),
            height: parseFloat(height.replace('px', '')),
          });
        }
      }, 1);
    }
  };

  Object.defineProperty(window.SCTool, 'ResizeDispathcher', {
    enumerable: true,
    configurable: true,
    set: value => {
      subscriber.push(value);

      return null;
    }
  });

  for (let key in store.get('meta')) {
    window.SCTool.listener.set(key, store.get('meta')[key]);
  }

  ReactDOM.render((
    <div>
      <GlobalModal on={window.SCTool} />
      <Router />
    </div>
  ), MOUNT_NODE);

  if (module.hot) {
    module.hot.accept();
  }
});