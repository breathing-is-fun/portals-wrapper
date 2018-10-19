/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-06-12 09:43:22
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-19 09:14:03
 */
import React, { Component } from 'react';
import { Route, NavLink, HashRouter } from 'react-router-dom';

import Bundle from '../../util/Bundle';

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

const Test = props => (
	<Bundle load={ () => import('../modules/Test') }>
		{ Test => <Test { ...props }/> }
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
    				<Route path='/test' component={ Test } />
    			</div>
    		</HashRouter>
    	);
    }
}