/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-11 11:59:51
 * @Last Modified by: zy9
 * @Last Modified time: 2018-11-03 17:43:08
 */
// import Promise from 'promise/lib/es6-extensions';
import { Promise } from 'es6-promise';

import { fetch } from 'whatwg-fetch';

const importPolyfill = url => {
	const promise = fetch(url)
		.then(reponse => reponse.text())
		.then(text => {
			const generate = new Function('module', text);
			const module = { exports: {} };

			generate(module);

			return module.exports;
		});

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
				pathArr.push(`importPolyfill('${ path }')`);
				newLayout.push(item);
			}
		}

		this.layout = newLayout;
		pathArr = `[${ pathArr.toString() }]`;

		this.loadScripts(pathArr);
	}

    loadScripts = pathArr => {
    	// this eval is dangerous beacuse of the source of path
    	/* eslint-disable no-eval */
    	const paths = eval(pathArr);

    	Promise.all(paths).then(modules => {
    		for (let i = 0; i < modules.length; i++) {
    			// const [moduleName] = Object.keys(modules[i]);
    			const { i: key } = this.layout[i];

    			const loadedModule = new modules[i](this.roots[key]);
    			const { _moduleOnMount } = loadedModule;

    			_moduleOnMount && _moduleOnMount.call(loadedModule);
    		}
    	});
    }
}