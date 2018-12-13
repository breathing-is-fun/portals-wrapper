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

  window.onresize = e => {
    if (subscriber.length != 0) {
      const {
        innerWidth,
        innerHeight,
      } = e.target;
      const {
        clientWidth,
        clientHeight,
      } = document.documentElement || document.body;
      const sizes = {
        innerWidth,
        innerHeight,
        clientWidth,
        clientHeight,
      };

      // 控制内部组件自适应
      SCTool.listener.do('onResize', {
        ...sizes,
        size: clientWidth <= 1700 ? 'sm' : '',
      });

      // onresize 执行到这里时，Grid 渲染尚未完成
      setTimeout(() => {
        for (let item of subscriber) {
          const { onResize, key } = item;
          const { width, height } = SCTool.listener.get(key);

          // 分发插件各自宽高
          onResize && onResize({
            ...sizes,
            size: parseFloat(width.replace('px', '')) <= 1700 ? 'sm' : '',
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