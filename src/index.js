/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-05-28 15:20:13
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-03 16:55:01
 */
import React from 'react';
import ReactDOM from 'react-dom';
// import { AppContainer } from 'react-hot-loader'

import Router from './router';
// import Wrapper from './modules/Wrapper';

const MOUNT_NODE = document.getElementById('root');

// const importPolyfill = url => {
// 	const map = [];

// 	if (url in map) {
// 		return map[url];
// 	}

// 	const promise = fetch(url)
// 		.then(reponse => reponse.text())
// 		.then(text => {
// 			const fct = new Function('module', text);
// 			const module = { exports: {} };

// 			fct(module);
// 			return module.exports;
// 		});

// 	map[url] = promise;

// 	return promise;
// };

// window.import = importPolyfill;

// const render = Component => ReactDOM.render(
//     <AppContainer>
//         <Component />
//     </AppContainer>, MOUNT_NODE
// )

ReactDOM.render(<Router />, MOUNT_NODE);
// render(Router);

if (module.hot) {
	// module.hot.accept('./router', () => {
	//     render(require('./router').default);
	// });
	module.hot.accept();
}