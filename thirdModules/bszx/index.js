class Bszx {
	constructor (root) {
		this['_moduleOnMount'] = this.onMount;

		root.innerHTML = `
			<img src='http://47.95.1.229:9003/UploadFile/201808/bszx.png' style='width: 100%; height: 100%;' />
		`;
	}

	onMount () {

	}
}

module.exports = Bszx;