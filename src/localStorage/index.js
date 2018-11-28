import Store from '../../util/Store';
import { ajax } from '../urlHelper';

export default class LocalStorageHandle {
	constructor (options, callback) {
		this.options = options;
		this.local = {};
		this.callback = callback;

		this.getOptions();
	}

    getOptions = () => {
    	ajax({
    		url: '../assets/options.json',
    		success: options => {
    			const { localStorageName } = options;

    			this.local = new Store(localStorageName);
    			this.local.set('meta', options);

    			this.callback && this.callback(this.local);
    		}
    	});
    }
}