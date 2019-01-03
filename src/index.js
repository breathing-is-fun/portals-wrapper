// import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import './assets/global.css';

import GlobalModal from './component/GlobalModal';
import Router from './router';
import Store from './localStorage';
import GlobalListener from './localStorage/GlobalListener';

const MOUNT_NODE = document.getElementById('root');

const getSize = clientWidth => (clientWidth <= 1270 ? 'sm' : '');

new Store(null, store => {
  let subscriber = [];
  // 控制内部组件自适应
  const resize = (target = window) => {
    const { innerWidth, innerHeight } = target;
    const { clientWidth, clientHeight } =
      document.documentElement || document.body;
    const sizes = {
      innerWidth,
      innerHeight,
      clientWidth,
      clientHeight,
    };

    for (let item of subscriber) {
      const { onResize, key } = item;
      const listenItem = SCTool.listener.get(key);
      let params = {
        key,
        size: getSize(sizes.clientWidth),
        ...sizes,
      };

      if (listenItem) {
        const { width, height } = listenItem;

        params = Object.assign({}, params, {
          width: parseFloat(width.replace('px', '')),
          height: parseFloat(height.replace('px', '')),
        });
      }

      // 分发插件各自宽高
      onResize && onResize(params);
    }

    return sizes;
  };

  window.SCTool = {};
  window.SCTool.modal = {};
  window.SCTool.store = store;
  window.SCTool.listener = new GlobalListener(MOUNT_NODE);
  window.SCTool.resize = resize;

  window.onresize = e => {
    if (subscriber.length != 0) {
      // onresize 执行到这里时，Grid 渲染尚未完成
      setTimeout(() => {
        resize();
      }, 1);
    }
  };

  Object.defineProperty(window.SCTool, 'RegisterResizeDispatcher', {
    enumerable: true,
    configurable: true,
    set: value => {
      subscriber.push(value);

      return;
    },
  });

  for (let key in store.get('meta')) {
    window.SCTool.listener.set(key, store.get('meta')[key]);
  }

  ReactDOM.render(
    <React.Fragment>
      <GlobalModal on={window.SCTool} />
      <Router />
    </React.Fragment>,
    MOUNT_NODE,
  );

  if (module.hot) {
    module.hot.accept();
  }
});
