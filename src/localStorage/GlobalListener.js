export default class GlobalListener {
	constructor (root) {
		this.listeners = {};
		this.root = root;
		this.meta = {};
	}

    on = (key, callback) => {
    	let targetListener = this.listeners[key];

    	if(!targetListener) {
    		this.root.addEventListener(key, ({ detail }) => {
    			callback && callback(detail);
    		});

    		this.listeners[key] = {
    			key,
    			value: callback,
    		};
    	}

    	return this;
    }

    do = (key, detail) => {
    	this.root.dispatchEvent(new CustomEvent(key, { detail }));

    	return this;
    }

	set = (key, data) => {
		this.meta[key] = data;

		return this;
	}

	getAll = () => {
		return this.meta;
	}

	get = key => {
		return this.meta[key];
	}
}