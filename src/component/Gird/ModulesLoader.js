/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-11 11:59:51
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-04 11:54:03
 */
// import Promise from 'promise/lib/es6-extensions';
// import { Promise } from 'es6-promise';
// import 'es6-promise';

import { fetch } from 'whatwg-fetch';

const importPolyfill = url => {
	const promise = fetch(url)
		.then(reponse => reponse.text())
		.then(text => {
			const module = { exports: {} };
			const generate = new Function('module', text);

			generate(module);

			return module.exports;
		}).catch(error => console.error('importPolyfill error: ' + error));

	return promise;
};

export default class ModulesLoader {
	constructor (layout, roots) {
		this.layout = layout;
		this.roots = roots;
	}

	load = () => {
		let pathArr = [], newLayout = [];

		for (let item of this.layout) {
			const { path, type } = item;

			if(type != 'iframe') {
				// pathArr.push(`importPolyfill('${ path }')`);
				pathArr.push(importPolyfill(path));
				newLayout.push(item);
			}
		}

		this.layout = newLayout;
		// pathArr = `[${ pathArr.toString() }]`;

		// this.loadScripts(pathArr);
		this.loadScripts(pathArr, 0, [], modules => {
			for (let i = 0; i < modules.length; i++) {
				if(!modules[i]) {
					continue;
				}

    			// const [moduleName] = Object.keys(modules[i]);
    			const { i: key } = this.layout[i];

    			const loadedModule = new modules[i](this.roots[key]);
    			const { _moduleOnMount } = loadedModule;

    			_moduleOnMount && _moduleOnMount.call(loadedModule);
    		}
		});
	}

    loadScripts = (pathArr, index = 0, importedModules = [], callback) => {
    	// this eval is dangerous beacuse of the source of path
    	/* eslint-disable no-eval */
    	// const paths = eval(pathArr);

    	// Promise.all(pathArr).then(modules => {
    		// for (let i = 0; i < modules.length; i++) {
    		// 	// const [moduleName] = Object.keys(modules[i]);
    		// 	const { i: key } = this.layout[i];

    		// 	const loadedModule = new modules[i](this.roots[key]);
    		// 	const { _moduleOnMount } = loadedModule;

    		// 	_moduleOnMount && _moduleOnMount.call(loadedModule);
    		// }
    	// }).catch(error => console.error(error));
    	if(index != pathArr.length) {
    		pathArr[index].then(importModule => {
    				importedModules.push(importModule);
    				this.loadScripts(pathArr, ++index, importedModules, callback);
    			}).catch(error => console.error('loadScripts error: ' + error));
    	} else {
    		callback && callback(importedModules);
    	}
    }
}