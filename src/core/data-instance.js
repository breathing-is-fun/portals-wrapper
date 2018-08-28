export default class DataInstance {
	constructor (options) {
		this.options = Object.assign({}, this.options, options);
	}

    options = {
    	id: '', // 组件唯一标识
    	name: '', // 组件名称
    	data: {
    		search: { // 比如搜索结果
    			key: '',
    			value: []
    		},
    		// etc..
    	},
    }

    get = () => this.options.data
}