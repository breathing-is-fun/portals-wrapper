import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import GlobalModal from './component/GlobalModal';
import Router from './router';

const MOUNT_NODE = document.getElementById('root');

// 不同路由间传递参数的对象，为防止不兼容，这里只保存非持久化数据
window['_acrossDatas'] = {
	moduleToComponent: { // 模块编辑页跳转到组件编辑页，后者需要的参数
		data: {},
	},
	componentToModule: {
		isComponentSave: false, // 模块编辑页跳转到组件编辑页后，组件编辑保存后需要跳转模块编辑页，这是组件编辑是否完成的标识
		data: {},
	}
};

if(!window.SCTool) {
	window.SCTool = {};
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