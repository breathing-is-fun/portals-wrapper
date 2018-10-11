/*
 * @Author: zy9@github.com/zy410419243
 * @Date: 2018-10-11 11:59:51
 * @Last Modified by: zy9
 * @Last Modified time: 2018-10-11 15:11:02
 */
export default class ModulesLoader {
	constructor (layout, roots) {
		this.layout = layout;
		this.roots = roots;
	}

	load = () => {
		let pathArr = [];

		for (let item of this.layout) {
			const { path, type } = item;

			type != 'iframe' && pathArr.push(`import('${ path }')`);
		}
		pathArr = `[${ pathArr.toString() }]`;

		this.loadScripts(pathArr);
	}

    loadScripts = pathArr => {
    	/* eslint-disable no-eval */
    	Promise.all(eval(`${ pathArr }`)).then(modules => {
    		for (let i = 0; i < modules.length; i++) {
    			const { TestModule } = modules[i];
    			const { i: key } = this.layout[i];
    			const testModule = new TestModule(this.roots[i][key]);
    			const { _moduleOnMount } = testModule;

    			_moduleOnMount && _moduleOnMount.call(testModule);
    		}
    	});
    }
}